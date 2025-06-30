<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class OnboardingController extends Controller
{
    public function render(): Response
    {
        // Get step from query parameter
        $step = request()->query('step', 'one'); // Default to 'one' if not provided
        
        $view = 'home/onboarding/onboarding-step-' . $step;
        return inertia($view);
    }

    /**
     * Handle the submission of an onboarding step.
     *
     * @param Request $request
     * @return Response|RedirectResponse
     */
    public function submitStep(Request $request): Response | RedirectResponse 
    {
        // Get step from query parameter or request input
        $currentStep = $request->query('step') ?? $request->input('step');
        
        if (!$currentStep) {
            throw new \InvalidArgumentException('Step parameter is required.');
        }

        session()->put(
            'onboarding_data',
            [
                "step" => $currentStep,
                "step_" . $currentStep => true,
                "completed_steps" => session('onboarding_data.completed_steps', []) + [$currentStep],
                "data" => $request->except('step')
            ]
        );

        if ($currentStep == "last") {
            return redirect()->route('home')->with('success', 'Onboarding completed successfully!');
        }

        // Convert step name to number for increment
        $stepToNumber = [
            'one' => 1,
            'two' => 2,
            'three' => 3,
            'four' => 4,
            'five' => 5,
            'six' => 6,
            'seven' => 7,
        ];

        $stepNumber = $stepToNumber[$currentStep] ?? 1;
        $nextStepNumber = $stepNumber + 1;
        
        session()->put('onboarding_data.step', $nextStepNumber);

        $numberToStep = [
            1 => 'one',
            2 => 'two',
            3 => 'three',
            4 => 'four',
            5 => 'five',
            6 => 'six',
            7 => 'seven',
        ];

        $nextStep = $numberToStep[$nextStepNumber] ?? 'one';

        // Redirect to the next step using query parameter
        return redirect()->route('onboarding.step', ['step' => $nextStep])->with('success', 'Onboarding step completed successfully!');
    }
}
