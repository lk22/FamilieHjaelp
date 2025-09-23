<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class ParentsEventsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Events/Index');
    }

    public function show(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Events/Show');
    }

    public function create(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Events/Create');
    }

    public function edit(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Events/Edit');
    }
}
