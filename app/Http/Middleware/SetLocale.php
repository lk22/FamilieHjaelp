<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request and set the application locale based on the 'locale' route parameter. If the 'locale' parameter is not present or is not in the list of available locales, it will default to the application's default locale.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->route('locale');

        if (! $locale || ! in_array($locale, config('app.available_locales', ['en', 'da']))) {
            $locale = config('app.locale');
        }

        app()->setLocale($locale);

        // Ensure any route() or redirect()->route() calls made for the rest of
        // this request (e.g. controller redirects) keep the resolved locale
        // without every call site having to pass it explicitly.
        URL::defaults(['locale' => $locale]);

        return $next($request);
    }
}
