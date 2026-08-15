<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

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

    /**
     * Render Helping resources page
     *
     * @return \Inertia\Response
     */
    public function helpResources(): Response
    {
        return Inertia::render('helpresources', [
            'faqItems' => trans('items.help_resources'),
        ]);
    }

    /**
     * Render Mission specific page
     *
     * @return \Inertia\Response
     */
    public function ourMission(): Response
    {
        return Inertia::render('our-mission', [
            'faqItems' => trans('items.mission_accordion_items'),
        ]);
    }

    /**
     * Render experiences landing page
     *
     * @return \Inertia\Response
     */
    public function experiences(): Response
    {
        return Inertia::render('experiences');
    }

    /**
     * Render abort experience page
     *
     * @return \Inertia\Response
     */
    public function abortionExperience(): Response
    {
        return Inertia::render('experiences/abortion');
    }

    /**
     * Render stillbirth specific page
     *
     * @return \Inertia\Response
     */
    public function stillbirthExperience(): Response
    {
        return Inertia::render('experiences/stillbirth');
    }

    /**
     * Render new parents specific experience page
     *
     * @return \Inertia\Response
     */
    public function newParentsExperience(): Response
    {
        return Inertia::render('experiences/parents');
    }

    /**
     * Render lost family member specific experience page
     *
     * @return \Inertia\Response
     */
    public function lostFamilyMemberExperience(): Response
    {
        return Inertia::render('experiences/lost-family-member');
    }

    /**
     * Render getting started page
     *
     * @return \Inertia\Response
     */
    public function gettingStarted(): Response
    {
        return Inertia::render('getting-started');
    }

    /**
     * Render functions page
     *
     * @return \Inertia\Response
     */
    public function ourFunctions(): Response
    {
        return Inertia::render('functions');
    }

    /**
     * Render calendar function page
     *
     * @return \Inertia\Response
     */
    public function calendarFunction(): Response
    {
        return Inertia::render('functions/calendar');
    }

    /**
     * Render Notes function page
     *
     * @return \Inertia\Response
     */
    public function notesFunction(): Response
    {
        return Inertia::render('functions/notes');
    }

    /**
     * Render planning function page
     *
     * @return \Inertia\Response
     */
    public function planningFunction(): Response
    {
        return Inertia::render('functions/planning');
    }

    /**
     * Render stories page
     *
     * @return \Inertia\Response
     */
    public function stories(): Response
    {
        return Inertia::render('stories');
    }
}