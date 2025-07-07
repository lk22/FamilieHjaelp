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
        $step = request()->query('step', 'situation');

        if ( ! session()->has('onboarding_data') ) {
            session()->put('onboarding_data.data.steps', [
                [
                    'step' => $step,
                    'data' => []
                ]
            ]);
        }
        
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

        // set the initial state if it dosn't exist other wise append the data to the existing steps array to define next steps data

        session()->put('onboarding_data.data.steps', [
            ...session()->get('onboarding_data.data.steps'),
            [
                'step' => $currentStep,
                'data' => $request->except('step')
            ]
        ]);

        // Redirect to the next step using query parameter
        return redirect()->route('onboarding.step', ['step' => $formattedNextStep])->with('success', 'Onboarding step completed successfully!');
    }
}
