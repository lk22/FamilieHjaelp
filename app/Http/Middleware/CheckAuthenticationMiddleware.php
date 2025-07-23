<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAuthenticationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // check if current route requires authentication
        if ( ! $request->user() || $request->route()->middleware('auth') ) {
            // if user is not authenticated, redirect to home page
            return redirect()->route('home')->with('error', 'You must be logged in to access this page.');
        }

        return $next($request);
    }
}
