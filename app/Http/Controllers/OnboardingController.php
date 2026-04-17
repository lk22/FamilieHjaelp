<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

use App\Models\OnboardingSession;

use App\Http\Requests\CompleteOnboardingRequest;
use App\Http\Requests\SubmitStepRequest;

class OnboardingController extends Controller
{
    /**
     * Render getting started view and handle onboarding session.
     *
     * @param Request $request
     * @return Response
     */
    public function show(Request $request): Response|RedirectResponse
    {
        $userId = $request->user()?->id;

        // Read session token first, then fall back to persisted browser cookie.
        $token = $request->session()->get('onboarding_session_token')
            ?? $request->cookie('onboarding_session_token');

        $session = OnboardingSession::findOrCreateSession($userId, $token);

        // Keep token available immediately server-side in the current request lifecycle.
        $request->session()->put('onboarding_session_token', $session->session_token);

        // Persist token to browser for subsequent requests.
        cookie()->queue('onboarding_session_token', $session->session_token, 60 * 24 * 30);

        return inertia('home/getting-started', [
            'onboardingSession' => [
                'token' => $session->session_token,
                'currentStep' => $session->current_step,
                'nextStep' => $session->next_step,
                'stepsData' => $session->steps_data,
                'formData' => $session->form_data,
                'completed' => $session->completed,
            ]
        ]);
    }

    /**
     * Submitting step from onboarding
     * @param SubmitStepRequest $request
     * @param string $scenario
     * @param string $step
     * @return JsonResponse
     */
    public function submitStep(SubmitStepRequest $request, string $scenario, string $step): JsonResponse|RedirectResponse
    {
        $nextStep = $request->input('nextStep');
        // Step 1: validation logic (to be implemented)
        if (! $request->validated()) {
            return response()->json(['message' => 'Validation failed. Please check your input and try again.'], 422);
        }

        // step 2: update the onboarding session with the submitted data (to be implemented)
        $existingSession = OnboardingSession::findByToken($request->cookie('onboarding_session_token'));

        if (! $existingSession) {
            return response()->json(['message' => 'Onboarding session not found. Please start the onboarding process again.'], 404);
        }

        $existingSession->update([
            "scenario" => $scenario,
            "current_step" => $step,
            "steps_data" => array_merge($existingSession->steps_data, [
                $step => $request->input('data')
            ]),
            "next_step" => $nextStep,
        ]);

        if ( $step === 'complete' ) {
            $existingSession->markAsCompleted();
        }

        // return a redirect response to the next step or a success message (to be implemented)
        return redirect()->route('onboarding.scenario.step', ['scenario' => $scenario, 'step' => $nextStep])
            ->with('success', 'Step submitted successfully');
    }

    /**
     * Update the current onboarding step data.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStep(Request $request, string $scenario, string $step) {
        return response()->json(['error' => 'Not implemented'], 501);
    }

    /**
     * Show a specific onboarding step.
     *
     * @param Request $request
     * @param string $scenario
     * @param string $step
     * @return Response|RedirectResponse
     */
    public function showStep(Request $request, string $scenario, string $step): Response|RedirectResponse
    {
        $allowedScenarios = ['abortion', 'stillbirth', 'parenting'];

        if (! in_array($scenario, $allowedScenarios)) {
            abort(404, 'Scenario not found.');
        }

        $userId = $request->user()?->id;

        $token = $request->session()->get('onboarding_session_token')
            ?? $request->cookie('onboarding_session_token');

        if (! $token) {
            return redirect()->route('getting-started')
                ->with('error', 'Onboarding session token mangler.');
        }

        $session = OnboardingSession::findByToken($token);

        if (! $session ) {
            abort(404, 'Onboarding session not found. Please start the onboarding process again.');
        }

        return inertia("home/onboarding/{$scenario}/steps/step", [
            'currentStep' => $step,
            'scenario' => $scenario,
            'onboardingSession' => [
                'token' => $session->session_token,
                'currentStep' => $session->current_step,
                'stepsData' => $session->steps_data,
                'formData' => $session->form_data,
                'completed' => $session->completed,
            ],
        ]);
    }

    /**
     * Show the confirmation page after completing onboarding steps.
     *
     * @param Request $request
     * @return Response
     */
    public function showConfirmation(Request $request): Response
    {
        $token = $request->cookie('onboarding_session_token');

        if( is_null($token) ) {
            abort(400, 'Onboarding session token is missing.');
        }

        $session = OnboardingSession::findByToken($token);

        return inertia("home/onboarding/confirmation", [
            'onboardingSession' => [
                'token' => $session->session_token,
                'currentStep' => $session->current_step,
                'stepsData' => $session->steps_data,
                'formData' => $session->form_data,
                'completed' => $session->completed,
            ],
        ]);
    }

    public function showCompleted(): Response
    {
        return inertia('home/onboarding/onboarding-completed');
    }

    /**
     * complete the onboarding process.
     *
     * @param CompleteOnboardingRequest $request
     * @return RedirectResponse
     */
    public function complete(Request $request)
    {
        $validated = $request->validate([
            'data.session_token' => 'required|string',
        ]);

        $userId = $request->user()?->id;
        $session = OnboardingSession::findWhen($userId, $validated['data']['session_token']);

        if (! $session) {
            abort(404, 'Onboarding session not found.');
        }

        $session->markAsCompleted();

        return redirect()->route('onboarding.completed.view')->with('success', 'Onboarding completed successfully!');
    }

    /**
     * Reset the onboarding process.
     *
     * @return RedirectResponse
     */
    public function reset(): RedirectResponse
    {
        $userId = request()->user()?->id;
        $sessionToken = request()->cookie('onboarding_session_token');

        $session = OnboardingSession::findWhen($userId, $sessionToken);

        if ($session) {
            $session->delete();
        }

        cookie()->queue(cookie()->forget('onboarding_session_token'));

        return redirect()->route('getting-started')->with('success', 'Onboarding has been reset successfully!');
    }
}
