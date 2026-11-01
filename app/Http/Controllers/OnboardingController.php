<?php

namespace App\Http\Controllers;

use App\Contracts\OnboardingServiceContract;
use App\Http\Requests\CompleteOnboardingRequest;
use App\Http\Requests\SubmitStepRequest;
use App\Models\OnboardingSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function __construct(
        private OnboardingServiceContract $onboardingSessionService,
    ) {
    }

    /**
     * Render getting started view and handle onboarding session.
     *
     * @return Response
     */
    public function show(Request $request): Response|RedirectResponse
    {
        $userId = $request->user()?->id;

        // Read session token first, then fall back to persisted browser cookie.
        $token = $request->session()->get('onboarding_session_token')
            ?? $request->cookie('onboarding_session_token');

        // $session = $this->onboardingSessionService->findBySessionToken($token);

        // $session = OnboardingSession::findOrCreateSession($userId, $token);
        $session = $this->onboardingSessionService->findOrCreateSession($userId, $token);

        // if ($session->current_step === "completed") {
        //     return redirect()->route('onboarding.completed.view');
        // }

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
                'locale' => $session->locale,
            ],
        ]);
    }

    /**
     * Submitting step from onboarding
     *
     * @return JsonResponse
     */
    public function submitStep(SubmitStepRequest $request, string $locale, string $scenario, string $step): JsonResponse|RedirectResponse
    {
        $nextStep = $request->input('nextStep');
        $data = $request->input('data');
        $data['sessionToken'] = $request->cookie('onboarding_session_token');

        if ( ! $request->validated() ) {
            return response()->json(['message' => 'Validation failed. Please check your input and try again.'], 422);
        }

        $stepSubmitted = $this->onboardingSessionService->submitStep($data, $nextStep, $scenario, $step);

        if ( ! $stepSubmitted ) {
            return response()->json(['message' => 'Failed to submit step. Please try again.'], 500);
        }

        // return a redirect response to the next step or a success message (to be implemented)
        return redirect()->route('onboarding.scenario.step', ['scenario' => $scenario, 'step' => $nextStep])
            ->with('success', 'Step submitted successfully');
    }

    /**
     * Update the current onboarding step data.
     */
    public function updateStep(Request $request, string $locale, string $scenario, string $step): JsonResponse
    {
        return response()->json(['error' => 'Not implemented'], 501);
    }

    /**
     * Show a specific onboarding step.
     */
    public function showStep(Request $request, string $locale, string $scenario, string $step): Response|RedirectResponse
    {
        if ($scenario !== 'family') {
            abort(404, 'Scenario not found.');
        }

        $userId = $request->user()?->id;

        $token = $request->session()->get('onboarding_session_token')
            ?? $request->cookie('onboarding_session_token');

        if (!$token) {
            return redirect()->route('app.getting-started')
                ->with('error', 'Onboarding session token mangler.');
        }

        $session = $this->onboardingSessionService->findBySessionToken($token);

        if (!$session) {
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
     */
    public function showConfirmation(Request $request): Response
    {
        $token = $request->cookie('onboarding_session_token');

        if (is_null($token)) {
            abort(400, 'Onboarding session token is missing.');
        }

        $session = $this->onboardingSessionService->findBySessionToken($token);

        return inertia('home/onboarding/confirmation', [
            'onboardingSession' => [
                'token' => $session->session_token,
                'currentStep' => $session->current_step,
                'stepsData' => $session->steps_data,
                'formData' => $session->form_data,
                'completed' => $session->completed,
            ],
        ]);
    }

    public function showCompleted(Request $request): Response
    {
        $token = $request->cookie('onboarding_session_token');

        if (is_null($token)) {
            abort(400, 'Onboarding session token is missing.');
        }

        $session = $this->onboardingSessionService->findBySessionToken($token);

        return inertia('home/onboarding/onboarding-completed', [
            'onboardingSessionToken' => $request->cookie('onboarding_session_token'),
            'stepsData' => $session->steps_data,
        ]);
    }

    /**
     * complete the onboarding process.
     *
     * @param  CompleteOnboardingRequest  $request
     * @return RedirectResponse
     */
    public function complete(Request $request)
    {
        $validated = $request->validate([
            'data.session_token' => 'required|string',
        ]);

        $userId = $request->user()?->id;
        $session = $this->onboardingSessionService->findBySessionToken($validated['data']['session_token']);

        if (!$session) {
            abort(404, 'Onboarding session not found.');
        }

        $session->markAsCompleted();

        return redirect()->route('onboarding.completed.view')->with('success', 'Onboarding completed successfully!');
    }

    /**
     * Reset the onboarding process.
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

        return redirect()->route('app.getting-started')->with('success', 'Onboarding has been reset successfully!');
    }

    public function verifyToken(Request $request): JsonResponse
    {

        return response()->json(['success' => true, 'message' => 'Session token verified successfully.']);
        $token = $request->cookie('onboarding_session_token');

        if (is_null($token)) {
            return response()->json(['success' => false, 'message' => 'Onboarding session token is missing.']);
        }

        $session = $this->onboardingSessionService->findBySessionToken($token);

        if (!$session) {
            return response()->json(['success' => false, 'message' => 'Onboarding session not found.']);
        }

        return response()->json(['success' => true, 'message' => 'Session token verified successfully.']);
    }
}
