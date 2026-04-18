<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

use Illuminate\Http\Request;
use App\Http\Requests\CompleteOnboardingRequest;

use App\Events\StoreUserPages;
use App\Events\StoreUserTodos;

class CompleteOnboardingController extends Controller
{
    /**
     * Handle the incoming request.
     * @param  \App\Http\Requests\CompleteOnboardingRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(CompleteOnboardingRequest $request): JsonResponse
    {
        $user = $request->user();
        $steps = $request->input('steps', []);
        $completedSteps = $request->input('completed_steps', []);
        $pregnancy_week = $request->input('steps.4.data.stepFive.pregnancy_week_number', null);
        $situation_date = $request->input('steps.3.data.stepFour.situation_date');

        if ( ! $user ) {
            return response()->json([
                'message' => 'Unauthorized, please log in to complete onboarding.'
            ], 401);
        }
        
        foreach ($steps as $step) {
            $isCompleted = $step['progress']['completed'] ?? false;
            $stepName = $step['name'] ?? 'unknown';
            
            // if the step is not completed and it is in the completed steps, return an error
            if ( in_array($stepName, $completedSteps) && ! $isCompleted ) {
                return response()->json([
                    'message' => 'Onboarding incomplete, please complete all steps.',
                    'missing_step' => $stepName
                ]);
            }
        }
        
        $todos = $user->todos()->get();
        $pages = $user->pages()->get();

        // If todos or pages already exist, return a message indicating that onboarding is already completed
        if ( ! $todos->isEmpty() || ! $pages->isEmpty() ) {
            return response()->json([
                'message' => 'Onboarding already completed.',
                'todos' => $todos,
                'pages' => $pages
            ]);
        }

        if ( $todos->isEmpty() || $pages->isEmpty() ) {
            return response()->json([
                'message' => 'Onboarding incomplete, something went wrong.',
                'todos' => $todos,
                'pages' => $pages
            ])->setStatusCode(400, 'Onboarding incomplete.')->withHeaders([
                'Content-Type' => 'application/json',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
            ]);
        }

        return response()->json([
            'message' => 'Onboarding completed successfully.'
        ]);
    }
    /**
     * Check if the user is authenticated.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function checkAuthenticated(Request $request): JsonResponse
    {
        if ( ! $request->user() ) {
            return response()->json([
                'message' => 'Not authenticated',
                'status' => false
            ], 401);
        }

        return response()->json([
            'message' => 'Authenticated',
            "status" => true
        ], 200);
    }

    /**
     * Store todos for the user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function storeTodos(Request $request): JsonResponse
    {
        $user = $request->user();
        $steps = $request->input('steps', []);
        $pregnancy_week = $request->input('steps.4.data.stepFive.pregnancy_week_number', null);
        $situation_date = $request->input('steps.3.data.stepFour.situation_date');

        if ( ! $user ) {
            return response()->json([
                'message' => 'Unauthorized, please log in to store todos.'
            ], 401);
        }

        $existingTodos = $user->todos()->get();

        if ( ! $existingTodos->isEmpty() ) {
            return response()->json([
                'message' => 'Todos already exist for this user.',
                'todos' => $existingTodos
            ])->setStatusCode(200, 'Todos already exist.')->withHeaders([
                'Content-Type' => 'application/json',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
            ]);
        }

        event(new StoreUserTodos($user, $steps));

        return response()->json([
            'message' => 'Todos initialized successfully.',
            'todos' => $user->todos()->get()
        ])->setStatusCode(201, 'Todos created successfully.')->withHeaders([
            'Content-Type' => 'application/json',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    /**
     * Store pages for the user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function storePages(Request $request): JsonResponse
    {
        $user = $request->user();
        $steps = $request->input('steps');

        $existingPages = $user->pages()->get();

        if ( $existingPages->isNotEmpty() ) {
            return response()->json([
                'message' => 'Pages already exist for this user.',
                'pages' => $existingPages
            ])->setStatusCode(200, 'Pages already exist.')->withHeaders([
                'Content-Type' => 'application/json',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
            ]);
        }

        event(new StoreUserPages($user, $steps));

        // default pages to be created
        return response()->json([
            'message' => 'Pages stored successfully.',
            'pages' => $user->pages()->get()
        ])->setStatusCode(201, 'Pages created successfully.')->withHeaders([
            'Content-Type' => 'application/json',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }
}
