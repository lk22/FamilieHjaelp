<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\OnboardingSession;

class PageController extends Controller
{
    /**
     * Rendering the home page
     *
     * @return Response
     */
    public function home(): Response
    {
        return Inertia::render('index');
    }
}