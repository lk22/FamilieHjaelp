<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\RedirectResponse;

class ProfileOverviewController extends Controller
{
    /**
     * Show the profile overview home page.
     * 
     * @return Response
     */
    public function index(): Response|RedirectResponse
    {
        if ( !auth()->user()->isOnboarded() ) {
            return redirect()->route('getting-started');
        }

        return Inertia::render('Profile/Overview/Home');
    }

    /**
     * Show the profile overview information page.
     * 
     * @param  string  $page
     * @param  string|null  $infoPage
     * @return Response
     */
    public function show(string $page = 'home'): Response
    {
        return Inertia::render('Profile/Overview/info/info-' . lcfirst($page));
    }

    /**
     * Show the todos page in the profile overview.
     * 
     * @return Response
     */
    public function todos(): Response
    {
        $todos = auth()->user()->todos()->get();
        return Inertia::render('Profile/Overview/todos', [
            'todos' => $todos
        ]);
    }
}
