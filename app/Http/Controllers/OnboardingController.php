<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function __invoke(): Response
    {
        // check if step parameter is set
        $step = request()->query('step');
        $view = 'home/onboarding/onboarding-step-' . $step;
        return inertia($view);
    }
}
