<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

enum RedirectRoute: string
{
    case DEFAULT_REDIRECT_ROUTE = 'profile.home';
    case GETTING_STARTED_REDIRECT_ROUTE = 'getting-started';
}

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $is_onboarded = $request->onboarding_completed ?? false;

        $authenticatedUser = auth()->user();

        // if the authenticated user is not onboarded, redirect to the getting started page
        if ( ! $is_onboarded && $authenticatedUser->has_completed_onboarding === false ) {
            return redirect()->intended(route(
                RedirectRoute::GETTING_STARTED_REDIRECT_ROUTE,
                absolute: false
            ));
        }

        if ( $request->redirect_to ) {
            return redirect()->intended(route($request->redirect_to, absolute: false));
        }

        // if the user is onboarded, redirect to the default route
        return redirect()->intended(route(RedirectRoute::DEFAULT_REDIRECT_ROUTE, absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
