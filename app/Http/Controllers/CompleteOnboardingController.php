<?php

namespace App\Http\Controllers;

use App\Events\StoreUserPages;
use App\Events\StoreUserTodos;
use App\Http\Requests\CompleteOnboardingRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeOnboardMail;

use App\Contracts\FamilyServiceContract;
use App\Contracts\FamilyRepositoryContract;
use App\Contracts\OnboardingServiceContract;

use App\Models\Family;
use App\Models\FamilyMember;

class CompleteOnboardingController extends Controller
{
    public function __construct(
        private FamilyServiceContract $familyService,
        private FamilyRepositoryContract $familyRepository,
        private OnboardingServiceContract $onboardingService
    ) {}

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $family = $request->input('familyId');
        $family = Family::findOrFail($family);
        $familyParents = FamilyMember::where('family_id', $family->id)->get();

        foreach ($familyParents as $parent) {
            $parentEmail = $parent->email;
            Mail::to($parentEmail)->send(new WelcomeOnboardMail($family, $parent));
        }

        return response()->json([
            'code' => 200,
            'message' => 'Onboarding process completed successfully',
        ], 200);
    }

    /**
     * Check if the user is authenticated.
     */
    public function checkAuthenticated(Request $request): JsonResponse
    {
        if (! $request->user()) {
            return response()->json([
                'message' => 'Not authenticated',
                'status' => false,
            ], 401);
        }

        return response()->json([
            'message' => 'Authenticated',
            'status' => true,
        ], 200);
    }

    /**
     * Store todos for the user.
     */
    public function storeTodos(Request $request): JsonResponse
    {
        $user = $request->user();
        $steps = $request->input('steps', []);
        $pregnancy_week = $request->input('steps.4.data.stepFive.pregnancy_week_number', null);
        $situation_date = $request->input('steps.3.data.stepFour.situation_date');

        if (! $user) {
            return response()->json([
                'message' => 'Unauthorized, please log in to store todos.',
            ], 401);
        }

        $existingTodos = $user->todos()->get();

        if (! $existingTodos->isEmpty()) {
            return response()->json([
                'message' => 'Todos already exist for this user.',
                'todos' => $existingTodos,
            ])->setStatusCode(200, 'Todos already exist.')->withHeaders([
                'Content-Type' => 'application/json',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
            ]);
        }

        event(new StoreUserTodos($user, $steps));

        return response()->json([
            'message' => 'Todos initialized successfully.',
            'todos' => $user->todos()->get(),
        ])->setStatusCode(201, 'Todos created successfully.')->withHeaders([
            'Content-Type' => 'application/json',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    /**
     * Store pages for the user.
     */
    public function storePages(Request $request): JsonResponse
    {
        $user = $request->user();
        $steps = $request->input('steps');

        $existingPages = $user->pages()->get();

        if ($existingPages->isNotEmpty()) {
            return response()->json([
                'message' => 'Pages already exist for this user.',
                'pages' => $existingPages,
            ])->setStatusCode(200, 'Pages already exist.')->withHeaders([
                'Content-Type' => 'application/json',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
            ]);
        }

        event(new StoreUserPages($user, $steps));

        // default pages to be created
        return response()->json([
            'message' => 'Pages stored successfully.',
            'pages' => $user->pages()->get(),
        ])->setStatusCode(201, 'Pages created successfully.')->withHeaders([
            'Content-Type' => 'application/json',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

}
