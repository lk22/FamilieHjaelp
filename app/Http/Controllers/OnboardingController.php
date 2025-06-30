<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function render(): Response
    {
        // check if step parameter is set
        $step = request()->query('step');
        $view = 'home/onboarding/onboarding-step-' . $step;
        return inertia($view);
    }

    public function submitStep(Request $request): Response {
        if (! $request->has('step')) {
            throw new \InvalidArgumentException('Step parameter is required.');
        }

        session()->put(
            'onboarding_data',
            [
                "step" => $request->input('step'),
                "step_" . $request->input('step') => true,
                "completed_steps" => session('onboarding_data.completed_steps', []) + [$request->input('step')],
                "data" => $request->except('step')
            ]
        );

        if ($request->input('step') == "last") {
            // Handle last step submission
            // For example, you might want to redirect to a different page or show a success message
            return redirect()->route('home')->with('success', 'Onboarding completed successfully!');
        }

        return redirect()->route('onboarding.step', ['step' => 'next']);
    }
}
