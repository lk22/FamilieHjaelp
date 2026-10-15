<?php

namespace App\Http\Controllers\Onboarding;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Contracts\OnboardingServiceContract;

use App\Actions\Onboarding\CreateFamily;

use App\Http\Requests\CreateFamilyRequest;


class CreateFamilyController extends Controller
{
    public function __construct(
        private OnboardingServiceContract $onboardingSessionService
    ){}

    public function __invoke(
        CreateFamilyRequest $request,
    ) : JsonResponse
    {
        if (! $request->json()) {
            return response()->json(['error' => 'Invalid JSON request'], 400);
        }

        if ( ! $request->validated() ) {
            return response()->json(['error' => 'Validation failed'], 422);
        }

        $token = $request->input('token');

        $verified = $this->onboardingSessionService->verifyOnboardingSessionToken($token);

        if ( ! $verified ) {
            return response()->json(['error' => 'Invalid token, cannot proceed'], 401);
        }

        $action = new CreateFamily();
        $response = $action->handle([
            'familyName' => $request->input('familyName'),
            'familySize' => $request->input('familySize') ?? 0,
        ]);

        $familyId = $response?->id;

        return response()->json([
            "message" => "Family creation event dispatched successfully",
            "familyId" => $familyId
        ], 201);
    }
}