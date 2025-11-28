<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

use App\Models\OnboardingSession;

class OnboardingController extends Controller
{

    public function show(Request $request): Response
    {
        $userId = $request->user()?->id;
        $sessionToken = $request->cookie('onboarding_session_token');

        // find or create onboarding session
        $session = OnboardingSession::findOrCreateSession($userId, $sessionToken);

        if ( ! $userId && ! $sessionToken ) {
            cookie()->queue('onboarding_session_token', $session->session_token, 60 * 24 * 30);
        }

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

    public function updateStep(Request $request) {
        $validated = $request->validate([
            'session_token' => 'required|string',
            'current_step' => 'required|string',
            'steps_data' => 'nullable|array',
            'form_data' => 'nullable|array',
        ]);

        $userId = $request->user()?->id;

        $session = OnboardingSession::findWhen($userId, $validated['session_token']);

        $session->update([
            'current_step' => $validated['current_step'],
            'steps_data' => array_merge($session->steps_data ?? [], $validated["steps_data"] ?? []),
            'form_data' => array_merge($session->form_data ?? [], $validated['form_data'] ?? [])
        ]);

        return response()->json([
            'success' => true, 
            'session' => $session
        ]);
    }

    public function complete(Request $request)
    {
        $validated = $request->validate([
            'session_token' => 'required|string',
        ]);

        $userId = $request->user()?->id;
        $session = OnboardingSession::findWhen($userId, $validated['session_token']);

        $session->markAsCompleted();

        return redirect()->route('onboarding.complete')->with('success', 'Onboarding completed successfully!');
    }


















    /**
     * Render the onboarding step view based on the step query parameter.
     *
     * @return Response
     */
    public function render(): Response
    {
        // dd(session()->get('onboarding_data.data.steps.0'));
        $step = request()->query('step', 'situation');
        $stepData = [];

        // if the onboarding data is not set in the session, initialize it
        foreach ( collect([1,2,3,4,5,6]) as $key => $value ) {
            $initialState[$value] = [
                'step' => $this->formatStepNumberToString($value),
                'data' => [],
                'is_completed' => false,
                'stepNumber' => $value
            ];
        }

        if ( ! session()->has('onboarding_data') ) {
            session()->put('onboarding_data.data.steps', [
                ...$initialState
            ]);
        }
        
        $stepData = session()->get('onboarding_data.data.steps', []);
        $completedSteps = session()->get('onboarding_data.completed_steps', []);

        $view = 'home/onboarding/onboarding-step-' . $step;
        return inertia($view, [
            'currentStep' => $step,
            'totalStepsCount' => count([0,1,2,3,4,5,6]),
            'totalSteps' => [0,1,2,3,4,5,6],
            'completedSteps' => $completedSteps,
            'stepData' => $stepData,
        ]);
    }
    
    /**
     * Handle the submission of an onboarding step.
     * TODO: refactor this method to handle the step submission logic more cleanly.
     * 
     * @param Request $request
     * @return Response|RedirectResponse
     */
    public function submitStep(Request $request)
    {
        // Get step from query parameter or request input
        $currentStep = $request->query('step') ?? $request->input('step');

        $completedSteps = session()->get('onboarding_data.completed_steps', []);

        if (!$currentStep) {
            throw new \InvalidArgumentException('Step parameter is required.');
        }
    
        // validate the current step
        if ($currentStep == "last") {
            return redirect()->route('onboarding.complete');
        }
        
        $numberToStep = $this->formatStepNumberToString($currentStep);
        
        $nextStep = $currentStep + 1;
        $formattedCurrentStep = $this->formatStepNumberToString($currentStep);
        $formattedNextStep = $this->formatStepNumberToString($nextStep);

        if ( ! session()->has('onboarding_data.completed_steps') ) {
            session()->put('onboarding_data.completed_steps', []);
        }

        // get current step state from session
        $currentStepData = session()->get('onboarding_data.data.steps.' . $currentStep, []);

        // check if the current step data is already completed
        // update the current step data with the request data
        $currentStepData = [
            'step' => $formattedCurrentStep,
            'data' => $request->except('step'),
            'is_completed' => true,
            'stepNumber' => (int) $currentStep
        ];

        // update the session with the current step data
        session()->put('onboarding_data.data.steps.' . $currentStep - 1, $currentStepData);

        session()->put('onboarding_data.completed_steps', [
            ...session()->get('onboarding_data.completed_steps', []),
            $currentStep
        ]);

        // Redirect to the next step using query parameter
        // return redirect()->route('onboarding.step', ['step' => $formattedNextStep])->with('success', 'Onboarding step completed successfully!');
    }

    /**
     * Render the onboarding completed view.
     * @return Response
     */
    public function completed(): Response
    {
        return inertia('home/onboarding/onboarding-completed');
    }

    /**
     * complete the onboarding process.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    // public function complete(Request $request): RedirectResponse
    // {
    //     $data = session()->get('onboarding_data.data.steps');
    //     // Here you can handle the completion logic, e.g., saving to the database or processing the data

    //     session()->forget('onboarding_data'); // Clear onboarding data after completion
    //     return redirect()->route('home')->with('success', 'Onboarding completed successfully!');
    // }

    /**
     * Reset the onboarding process.
     *
     * @return RedirectResponse
     */
    public function reset(): RedirectResponse
    {
        // Clear the onboarding data from the session
        session()->forget('onboarding_data');
        // Redirect to the first step of the onboarding process
        return redirect()->route('onboarding.step', ['step' => 'one'])->with('success', 'Onboarding has been reset successfully!');
    }

    /**
     * Format the step number to a string representation.
     *
     * @param int $step
     * @return string
     */
    private function formatStepNumberToString(int $step): string
    {
        $steps = ['one', 'two', 'three', 'four', 'five', 'six'];
        return $steps[$step - 1] ?? 'one';
    }
}
