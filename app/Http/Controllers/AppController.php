<?php

namespace App\Http\Controllers;

use Inertia\Response;

class AppController extends Controller
{
    public function home(): Response
    {
        return inertia('home/index');
    }

    public function gettingStarted(): Response
    {
        $step = session()->get('onboarding_data.data.steps.0.step', 'one');

        return inertia('home/getting-started', [
            'step' => $step ? $step : 'one',
        ]);
    }
}
