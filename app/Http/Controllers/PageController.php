<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\OnboardingSession;

class PageController extends Controller
{
    /**
     * Rendering the home page
     *
     * @return Response
     */
    public function home(): Response
    {
        return Inertia::render('index');
    }

    public function helpResources(): Response
    {
        $resources = [
            [
                'title' => 'Økonomisk støtte',
                'description' => 'Find information om økonomisk støtte og tilskud, der kan hjælpe familier i nød.',
                'link' => route('app.home') . '#economic-support',
            ],
            [
                'title' => 'Psykologisk støtte',
                'description' => 'Få adgang til ressourcer og rådgivning for at håndtere stress og følelsesmæssige udfordringer.',
                'link' => route('app.home') . '#psychological-support',
            ],
            [
                'title' => 'Praktisk hjælp',
                'description' => 'Opdag muligheder for praktisk hjælp, såsom madlevering, transport og børnepasning.',
                'link' => route('app.home') . '#practical-help',
            ],
        ];

        return Inertia::render('helpresources', [
            'resources' => $resources,
        ]);
    }
}