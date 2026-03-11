<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Response;

class AbortOnboardingController extends Controller {
    public function index(): Response
    {
        return inertia('Home/Onboarding/Abort/getting-started');
    }
}