<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $locale = $request->route('locale') ?? config('app.locale');

        if($locale && in_array($locale, config('app.available_locales', ['en', 'da']))) {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
