<?php

namespace App\Http\Controllers;

use Inertia\Response;

class AbortOnboardingController extends Controller
{
    public function index(): Response
    {
        return inertia('Home/Onboarding/Abort/getting-started');
    }
}
