<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class ParentsProfileController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Index');
    }

    public function children(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Children/Index');
    }

    public function events(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Events/Index');
    }

    public function settings(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Settings');
    }
}
