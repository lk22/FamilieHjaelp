<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class OnboardingController extends Controller
{
    /**
     * Render the onboarding step view based on the step query parameter.
     *
     * @return Response
     */
    public function render(): Response
    {
        $step = request()->query('step', 'one');
        
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
        
        if ($currentStep == "last") {
            return redirect()->route('home')->with('success', 'Onboarding completed successfully!');
        }
        // Convert step name to number for increment
        
        $numberToStep = [
            1 => 'one',
            2 => 'two',
            3 => 'three',
            4 => 'four',
            5 => 'five',
            6 => 'six',
            7 => 'seven',
        ];
        
        $nextStep = $currentStep + 1;
        $formattedNextStep = $numberToStep[$nextStep];
        
        session()->put(
            'onboarding_data',
            [
                "current_step" => $currentStep,
                "next_step" => $nextStep,
                "completed_steps" => $currentStep,
                "data" => $request->except('step')
            ]
        );

        // Redirect to the next step using query parameter
        return redirect()->route('onboarding.step', ['step' => $formattedNextStep])->with('success', 'Onboarding step completed successfully!');
    }
}
