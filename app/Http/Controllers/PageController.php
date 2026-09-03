<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Render the home page
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
     * @return Response
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
     * @return Response
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
     * @return Response
     */
    public function experiences(): Response
    {
        return Inertia::render('experiences');
    }

    /**
     * Render abort experience page
     *
     * @return Response
     */
    public function abortionExperience(): Response
    {
        return Inertia::render('experiences/abortion');
    }

    /**
     * Render stillbirth specific page
     *
     * @return Response
     */
    public function stillbirthExperience(): Response
    {
        return Inertia::render('experiences/stillbirth');
    }

    /**
     * Render new parents specific experience page
     *
     * @return Response
     */
    public function newParentsExperience(): Response
    {
        return Inertia::render('experiences/parents');
    }

    /**
     * Render lost family member specific experience page
     *
     * @return Response
     */
    public function lostFamilyMemberExperience(): Response
    {
        return Inertia::render('experiences/lost-family-member');
    }

    /**
     * Render getting started page
     *
     * @return Response
     */
    public function gettingStarted(): Response
    {
        return Inertia::render('getting-started');
    }

    /**
     * Render functions page
     *
     * @return Response
     */
    public function ourFunctions(): Response
    {
        return Inertia::render('functions');
    }

    /**
     * Render calendar function page
     *
     * @return Response
     */
    public function calendarFunction(): Response
    {
        return Inertia::render('functions/calendar');
    }

    /**
     * Render Notes function page
     *
     * @return Response
     */
    public function notesFunction(): Response
    {
        return Inertia::render('functions/notes');
    }

    /**
     * Render planning function page
     *
     * @return Response
     */
    public function planningFunction(): Response
    {
        return Inertia::render('functions/planning');
    }

    /**
     * Render SMS function page
     *
     * @return Response
     */
    public function smsFunction(): Response
    {
        return Inertia::render('functions/sms');
    }

    /**
     * Render tasks fuction page
     *
     * @return Response
     */
    public function tasksFunction(): Response
    {
        return Inertia::render('functions/tasks');
    }

    /**
     * Render Healt function page
     *
     * @return Response
     */
    public function healthFunction(): Response
    {
        return Inertia::render('functions/health');
    }

    /**
     * Render baby tracker function page
     *
     * @return Response
     */
    public function babyTrackerFunction(): Response
    {
        return Inertia::render('functions/baby-tracker');
    }

    /**
     * Render Typs and Tricks function
     *
     * @return Response
     */
    public function tipsAndTricksFunction(): Response
    {
        return Inertia::render('functions/tips-and-tricks');
    }

    public function milestoneFunction(): Response
    {
        return Inertia::render('functions/milestones');
    }

    /**
     * Render stories page
     *
     * @return Response
     */
    public function stories(): Response
    {
        return Inertia::render('stories');
    }

    public function blog(): Response
    {
        $posts = Post::where('is_published', true)->get();

        return Inertia::render('blog', [
            'posts' => $posts,
        ]);
    }

    public function blogPost(Post $post): Response
    {
        $post = Post::where('slug', $post->slug)->where('is_published', true)->firstOrFail();

        return Inertia::render('blog/Post', [
            'post' => $post,
        ]);
    }
}