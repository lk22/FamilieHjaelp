<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CompleteOnboardingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // validate the request
        dd($request->all());
    }
}
