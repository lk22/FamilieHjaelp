<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Activity;

class ParentsActivityController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Activities/Index');
    }

    public function show(Activity $activity): Response
    {
        return Inertia::render('Profile/Overview/Parents/Activities/Show');
    }

    public function create(): Response
    {
        return Inertia::render('Profile/Overview/Parents/Activities/Create');
    }

    public function store(Request $request): void
    {

    }

    public function edit(Activity $activity): Response
    {
        return Inertia::render('Profile/Overview/Parents/Activities/Edit');
    }

    public function update(Request $request, Activity $activity): Response
    {

    }

    public function delete(Activity $activity): Response
    {

    }
}
