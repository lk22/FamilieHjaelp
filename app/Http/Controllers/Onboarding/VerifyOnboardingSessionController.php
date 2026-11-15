<?php

namespace App\Http\Controllers\Onboarding;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

use App\Services\OnboardingService;

class VerifyOnboardingSessionController extends Controller
{

    public function __construct(private OnboardingService $onboardingService) {}

    /**
     * Verifying the onboarding session and check if its valid and not completed
     */
    public function __invoke(Request $request): JsonResponse
    {
        $sessionToken = $request->query('token');

        if ( ! $sessionToken ) {
            return response()->json([
                'message' => 'Session token is required',
                'status' => false,
            ], 400);
        }

        // Here you would typically verify the session token against your session store or database
        if ( ! $this->onboardingService->checkActiveSession($sessionToken) ) {
            return response()->json([
                'message' => 'Session token is invalid',
                'status' => false,
                "active" => false
            ], 400);
        }

        if ( $this->onboardingService->checkCompleteSession($sessionToken) ) {
            return response()->json([
                'message' => 'Din familie er allerede oprettet',
                'status' => false,
                "active" => false,
                'completed' => true
            ], 200);
        }

        return response()->json([
            'message' => 'Session token is valid',
            'status' => true,
            'active' => true,
            'completed' => false
        ], 200);
    }
}
