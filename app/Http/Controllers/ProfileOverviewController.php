<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\RedirectResponse;

use App\Models\Todo;
use App\Models\Page;

class ProfileOverviewController extends Controller
{
    /**
     * Show the profile overview home page.
     * 
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request): Response|RedirectResponse
    {
        // Check if the user is authenticated and has completed onboarding
        if ( ! $request->user()->isOnboarded() ) {
            return redirect()->route('getting-started');
        }

        $user = $request->user()->load(['todos', 'pages']);

        return Inertia::render('Profile/Overview/Home',
            [
                'todos' => $user->todos,
                'pages' => Inertia::defer(fn() => $user->pages)
            ]
        );
    }

    /**
     * Show the profile overview information page.
     * 
     * @param  string  $page
     * @param  string|null  $infoPage
     * @return Response
     */
    public function show(Request $request, ?string $page): Response
    {
        $foundPage = $request->user()->pages()->where('slug', $page)->first();
        return Inertia::render('Profile/Overview/info/info-' . $foundPage->slug);
    }

    /**
     * Show the todos page in the profile overview.
     * 
     * @param  Request  $request
     * @return Response
     */
    public function todos(Request $request): Response
    {
        $todos = $request->user()->todos;
        return Inertia::render('Profile/Overview/todos', 
        [
            'todos' => $todos
        ]);
    }

    /*
    * Show the notes page in the profile overview.
    *
    * @param  Request  $request
    * @return Response
    */
    public function notes(Request $request): Response
    {
        $notes = $request->user()->notes;
        return Inertia::render('Profile/Overview/notes', 
        [
            'notes' => $notes
        ]);
    }

    /**
     * Show the notifications page in the profile overview.
     * @param  Request  $request
     * @return Response 
    */
    public function notifications(Request $request): Response
    {
        $notifications = []; // profile notifications to be implemented
        return Inertia::render('Profile/Overview/notifications', 
        [
            'notifications' => $notifications
        ]);
    }
}
