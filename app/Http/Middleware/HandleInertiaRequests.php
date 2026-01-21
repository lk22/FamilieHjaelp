<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

use App\Models\User;
use App\Models\OnboardingSession;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Share a random background image from the public/images/background directory.
     *
     * @return string|null
     */
    public function shareRandomBackgroundImage(): string|null
    {
        $images = public_path('images/background');

        // get all image files in the directory check if the directory exists and make a image extension filter and exclude .. and . directories
        $files = array_filter(scandir($images, SCANDIR_SORT_NONE), function ($file) use ($images) {
            return !is_dir($images . '/' . $file) && preg_match('/\.(jpg|jpeg|png|gif)$/i', $file);
        });

        return $files ? asset('/images/background/' . $files[array_rand($files)]) : null;
    }

    /**
     * Getting onboarding session
     *
     * @return array
     */
    public function getOnboardingSession(Request $request) : array
    {
        $request = request();

        $userId = $request->user()?->id;
        $sessionToken = $request->cookie('onboarding_session_token');

        $session = OnboardingSession::findOrCreateSession($userId, $sessionToken);

        $request->session()->put('onboarding_session_token', $session->session_token);

        return [
            'token' => $session->session_token ?? "",
            'currentStep' => $session->current_step ?? "",
            'currentScenario' => $session->scenario ?? "",
            'stepsData' => $session->steps_data ?? [],
            'formData' => $session->form_data ?? [],
            'completed' => $session->completed ?? false,
        ];
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            // 'name' => config('app.name'),
            'name' => 'Forældrehjælp',
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'background_image' => $this->shareRandomBackgroundImage(),
            'auth' => [
                'user' => $request->user(),
                'isOnboarded' => $request->user() ? $request->user()->isOnboarded() : false
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'message' => $request->session()->get('message'),
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'info' => $request->session()->get('info'),
            ],
            'onboarding' => session('onboarding_data'),
            'completedSteps' => session('onboarding_data.completed_steps', []),
            'onboardingSession' => $this->getOnboardingSession($request),
        ];
    }
}
