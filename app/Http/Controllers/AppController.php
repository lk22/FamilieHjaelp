<?php

namespace App\Http\Controllers;

class AppController extends Controller
{
    public function home(): \Inertia\Response
    {
        return inertia('home/index');
    }

    public function gettingStarted(): \Inertia\Response
    {
        $step = session()->get('onboarding_data.data.steps.0.step', 'one');
        return inertia('home/getting-started', [
            'step' => $step ? $step : 'one',
        ]);
    }
}
