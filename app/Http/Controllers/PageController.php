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
    public function ourMission(): Response
    {
        $faqItems = [
            [
                "title" => "Hvordan kan ForældreHjælp hjælpe mig som forælder?",
                "body" => "ForældreHjælp tilbyder en række ressourcer og værktøjer designet til at støtte forældre gennem udfordrende tider. Vores platform giver adgang til professionel vejledning, informative artikler og et støttende fællesskab, der kan hjælpe dig med at navigere i de følelsesmæssige og praktiske aspekter af forældreskab."
            ],
            [
                "title" => "Hvordan kan jeg få adgang til ForældreHjælp?",
                "body" => "Du kan få adgang til ForældreHjælp ved at besøge vores hjemmeside og oprette en konto. Herefter kan du udforske de forskellige ressourcer og tjenester, vi tilbyder."
            ],
            [
                "title" => "Er ForældreHjælp gratis at bruge?",
                "body" => "Ja, grundlæggende funktioner på ForældreHjælp er gratis at bruge. Vi tilbyder også premium-tjenester for dem, der ønsker yderligere støtte og ressourcer."
            ],
            [
                "title" => "Hvordan sikrer I fortroligheden af mine oplysninger?",
                "body" => "Vi tager din fortrolighed alvorligt og anvender avancerede sikkerhedsforanstaltninger for at beskytte dine personlige oplysninger. Vores privatlivspolitik beskriver, hvordan vi indsamler, bruger og beskytter dine data."
            ],
            [
                "title" => "Hvordan kan jeg kontakte support, hvis jeg har brug for hjælp?",
                "body" => "Hvis du har brug for hjælp, kan du kontakte vores supportteam via e-mail eller telefon. Vores kontaktoplysninger findes på vores hjemmeside under sektionen 'Kontakt os'."
            ],
            [
                "title" => "Hvilke typer ressourcer tilbyder I til forældre?",
                "body" => "Vi tilbyder en bred vifte af ressourcer, herunder artikler, videoer, webinarer og adgang til professionelle rådgivere. Vores indhold dækker emner som graviditet, fødsel, tab, sorghåndtering og meget mere."
            ]
        ];

        return Inertia::render('our-mission',
        [
            'faqItems' => $faqItems,
        ]);
    }

    public function experiences(): Response
    {
        return Inertia::render('expeiences');
    }

    public function abortionExperience(): Response
    {
        return Inertia::render('experiences/abortion');
    }
    public function stillbirthExperience(): Response
    {
        return Inertia::render('experiences/stillbirth');
    }
    public function newParentsExperience(): Response
    {
        return Inertia::render('experiences/parents');
    }
}