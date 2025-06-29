<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Rendering the home page
     *
     * @return Response
     */
    public function home(): Response
    {
        return Inertia::render('home/index');
    }

    /**
     * Rendering the getting started page
     *
     * @return Response
     */
    public function gettingStarted(): Response
    {
        return Inertia::render('home/getting-started');
    }
}
