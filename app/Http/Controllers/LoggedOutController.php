<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class LoggedOutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        // Check if the user is authenticated, if so, redirect to the home page
        if ($request->user()) {
            return redirect()->route('profile.home');
        }

        return inertia('logged-out');
    }
}
