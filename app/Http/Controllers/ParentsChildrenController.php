<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class ParentsChildrenController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Children/Index');
    }

    public function show(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Children/Show');
    }

    public function Create(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Children/Create');
    }

    public function edit(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Children/Edit');
    }
}
