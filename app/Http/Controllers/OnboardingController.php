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
        $token = $request->cookie('onboarding_session_token');

        $category = $request->query('category', null);
        $step = $request->query('step', 'one');

        $session = OnboardingSession::findOrCreateSession($userId, $token);

        cookie()->queue('onboarding_session_token', $session->session_token, 60 * 24 * 30);

        if ( $category && $step === 'one' ) {
            $category = $request->query('category', $category);

            return redirect()->route('onboarding.step', [
                'step' => 'one',
                'category' => $category
            ]);
        }

        // Making sure both category and step are set for redirection and step is not 'one
        if ( $category && $step ) {
            return redirect()->route('onboarding.step', [
                'step' => $step,
                'category' => $category
            ]);
        }

        cookie()->queue('onboarding_session_token', $session->session_token, 60 * 24 * 30);

        // render getting started view with onboarding session data
        return inertia('home/getting-started', [
            'onboardingSession' => [
                'token' => $session->session_token,
                'currentStep' => $session->current_step,
                'stepsData' => $session->steps_data,
                'formData' => $session->form_data,
                'completed' => $session->completed,
            ]
        ]);
    }

    public function submitStep(SubmitStepRequest $request, string $scenario, string $step): JsonResponse|RedirectResponse
    {
        // This method will handle the form submission for each onboarding step.
        // For now, it will just redirect back to the step view with a success message.

        // In a real implementation, you would validate the request data and update the onboarding session accordingly.

        // Step 1: validation logic (to be implemented)
        $validated = $request->validated();
        return response()->json([
            'message' => 'Validation successful. This is a placeholder response. Implement validation logic in the controller.',
            'validatedData' => $validated,
        ]);

        if (! $validated) {
            return response()->json(['message' => 'Validation failed. Please check your input and try again.'], 422);
        }

        // step 2: update the onboarding session with the submitted data (to be implemented)
        // step 3: determine the next step and redirect to it (to be implemented)
        // return a success message for now to indicate the form was submitted successfully.

        return response()->json([
            'message' => 'Step submitted successfully. This is a placeholder response. Implement validation and session update logic in the controller.',
            'scenario' => $scenario,
            'step' => $step,
            'submittedData' => $request->all(),
        ]);
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

        $token = $request->cookie('onboarding_session_token');

        if ( ! $token ) {
            return redirect()->route('getting-started')->with('error', 'Onboarding session token is missing.');
        }

        $session = OnboardingSession::findByToken($token);

        if (! $session ) {
            return redirect()->route('getting-started')->with('error', 'Onboarding session not found.');
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
     * @param string $scenario
     * @return Response
     */
    public function showConfirmation(Request $request): Response
    {
        $token = $request->cookie('onboarding_session_token');

        if( is_null($token) ) {
            abort(404, 'Onboarding session token is missing.');
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

    /**
     * complete the onboarding process.
     *
     * @param CompleteOnboardingRequest $request
     * @return RedirectResponse
     */
    public function complete(CompleteOnboardingRequest $request)
    {
        $validated = $request->validated();

        $userId = $request->user()?->id;
        $session = OnboardingSession::findWhen($userId, $validated['session_token']);

        $session->markAsCompleted();

        return redirect()->route('onboarding.complete')->with('success', 'Onboarding completed successfully!');
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
