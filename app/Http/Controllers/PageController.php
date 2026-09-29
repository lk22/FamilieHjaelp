<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Render the home page
     */
    public function home(): Response
    {
        $locale = app()->getLocale();
        $posts = Post::where('locale', $locale)->latest()->limit(3)->get();

        $testimonials = Testimonial::latest()->limit(3)->get();

        return Inertia::render('index', [
            'posts' => $posts,
            'testimonials' => $testimonials,
        ]);
    }

    /**
     * Render Helping resources page
     */
    public function helpResources(): Response
    {
        return Inertia::render('helpresources', [
            'faqItems' => trans('items.help_resources'),
        ]);
    }

    /**
     * Render Mission specific page
     */
    public function ourMission(): Response
    {
        return Inertia::render('our-mission', [
            'faqItems' => trans('items.mission_accordion_items'),
        ]);
    }

    /**
     * Render experiences landing page
     */
    public function experiences(): Response
    {
        return Inertia::render('experiences');
    }

    /**
     * Render abort experience page
     */
    public function abortionExperience(): Response
    {
        return Inertia::render('experiences/abortion');
    }

    /**
     * Render stillbirth specific page
     */
    public function stillbirthExperience(): Response
    {
        return Inertia::render('experiences/stillbirth');
    }

    /**
     * Render new parents specific experience page
     */
    public function newParentsExperience(): Response
    {
        return Inertia::render('experiences/parents');
    }

    /**
     * Render lost family member specific experience page
     */
    public function lostFamilyMemberExperience(): Response
    {
        return Inertia::render('experiences/lost-family-member');
    }

    /**
     * Render getting started page
     */
    public function gettingStarted(): Response
    {
        return Inertia::render('getting-started');
    }

    /**
     * Render functions page
     */
    public function ourFunctions(): Response
    {
        return Inertia::render('functions');
    }

    /**
     * Render calendar function page
     */
    public function calendarFunction(): Response
    {
        return Inertia::render('functions/calendar');
    }

    /**
     * Render Notes function page
     */
    public function notesFunction(): Response
    {
        return Inertia::render('functions/notes');
    }

    /**
     * Render planning function page
     */
    public function planningFunction(): Response
    {
        return Inertia::render('functions/planning');
    }

    /**
     * Render SMS function page
     */
    public function smsFunction(): Response
    {
        return Inertia::render('functions/sms');
    }

    /**
     * Render tasks fuction page
     */
    public function tasksFunction(): Response
    {
        return Inertia::render('functions/tasks');
    }

    /**
     * Render Healt function page
     */
    public function healthFunction(): Response
    {
        return Inertia::render('functions/health');
    }

    /**
     * Render baby tracker function page
     */
    public function babyTrackerFunction(): Response
    {
        return Inertia::render('functions/baby-tracker');
    }

    /**
     * Render Typs and Tricks function
     */
    public function tipsAndTricksFunction(): Response
    {
        return Inertia::render('functions/tips-and-tricks');
    }

    /**
     * Render milestones function
     */
    public function milestoneFunction(): Response
    {
        return Inertia::render('functions/milestones');
    }

    /**
     * Render stories page
     */
    public function stories(): Response
    {
        return Inertia::render('stories');
    }

    /**
     * Render blog page with featured and regular blog posts
     */
    public function blog(string $locale, $category = null): Response
    {
        $locale = app()->getLocale();
        $categories = Category::all();
        $cat = Category::where('slug', $category)->first();
        $featured = Post::where('locale', $locale)->latest()->first();
        $posts = Post::where('locale', $locale)
            ->where('is_published', true);

        if ($category) {
            $posts = $posts->whereHas('categories', function ($query) use ($category) {
                $query->where('slug', $category);
            });
        }

        $posts = $posts->latest()->get();

        return Inertia::render('blog', [
            'posts' => $posts,
            'featured' => $featured,
            'locale' => $locale,
            'categories' => $categories,
            'category' => $cat->name ?? null,
        ]);
    }

    /**
     * Render a single blog post page
     */
    public function blogPost(string $locale, Post $post): Response
    {
        $locale = app()->getLocale();

        $post = Post::where('slug', $post->slug)
            ->where('is_published', true)
            ->where('locale', $locale)
            ->firstOrFail();

        return Inertia::render('blog/Post', [
            'post' => $post,
        ]);
    }
}
