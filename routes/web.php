<?php

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\ProfileOverviewController;
use App\Http\Controllers\CompleteOnboardingController;
use App\Http\Controllers\ProfileTodoController;
use App\Http\Controllers\ProfileNoteController;

/**
 * Public routes
 *
 * These routes are accessible to all users, including those who are not authenticated. They include the home page, informational pages, and the onboarding process for new users.
 * @routes - Home page: GET /
 * @routes - Help resources: GET /hjaelpemidler
 * @routes - Our mission: GET /vores-mission
 * @routes - User experiences: GET /har-du-oplevet/abort, GET /har-du-oplevet/doedfødsel, GET /har-du-oplevet/foraeldre, GET /har-du-oplevet/mistet-familie-medlem
 * @routes - Getting started guide: GET /kom-igang
 */
Route::group([
    'middleware' => ['web'],
    'prefix' => '/{locale?}',
    'where' => ['locale' => '[a-zA-Z]{2}']
], function () {
    Route::get('/', [PageController::class, 'home'])->name('home');
    Route::get('/hjaelpemidler', [PageController::class, 'helpResources'])->name('page.help-resources');
    Route::get('/vores-mission', [PageController::class, 'ourMission'])->name('page.our-mission');
    Route::get('/funktioner', [PageController::class, 'features'])->name('page.functions');
    Route::get('/har-du-oplevet/abort', [PageController::class, 'abortionExperience'])->name('page.experiences.abortion');
    Route::get('/har-du-oplevet/doedfoedsel', [PageController::class, 'stillbirthExperience'])->name('page.experiences.stillbirth');
    Route::get('/har-du-oplevet/foraeldre', [PageController::class, 'newParentsExperience'])->name('page.experiences.new-parents');
    Route::get('/har-du-oplevet/mistet-familie-medlem', [PageController::class, 'lostFamilyMemberExperience'])->name('page.experiences.lost-family-member');
    Route::get('/kom-igang', [PageController::class, 'gettingStarted'])->name('page.getting-started');
    Route::get('/app', [AppController::class, 'home'])->name('app.home');
});

/**
 * Onboarding routes
*/
Route::get('/app/onboarding', [OnboardingController::class, 'show'])->name('onboarding.step');
Route::get('/app/getting-started', [OnboardingController::class, 'show'])->middleware('guest')->name('getting-started');
Route::get('/app/onboarding/{scenario}/step/{step}', [OnboardingController::class, 'showStep'])->name('onboarding.scenario.step');
Route::post('/app/onboarding/{scenario}/step/{step}', [OnboardingController::class, 'submitStep'])->name('onboarding.scenario.step.submit');
Route::get('/app/onboarding/confirmation', [OnboardingController::class, 'showConfirmation'])->name('onboarding.confirmation');
Route::get('/app/onboarding/completed', [OnboardingController::class, 'showCompleted'])->name('onboarding.completed.view');

Route::post('/app/onboarding/{scenario}/update-step/{step}', [OnboardingController::class, 'updateStep'])->name('onboarding.scenario.update-step');

Route::get('/app/onboarding/reset', [OnboardingController::class, 'reset'])->name('onboarding.reset');
Route::post('/app/onboarding/completed', [OnboardingController::class, 'complete'])->name('onboarding.completed');

/**
 * Completing onboarding process routes
 */
Route::post('/app/onboarding/process/complete/todos', [CompleteOnboardingController::class, 'storeTodos'])->name('onboarding.process.complete.todos');
Route::post('/app/onboarding/process/complete/pages', [CompleteOnboardingController::class, 'storePages'])->name('onboarding.process.complete.pages');
Route::post('/app/onboarding/process/complete', [CompleteOnboardingController::class, '__invoke'])->name('onboarding.process.complete');

// Profile overview routes
Route::get('/app/profile/overview/', [ProfileOverviewController::class, 'show'])->name('profile.home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/app/profile/overview', [ProfileOverviewController::class, 'index'])->name('profile.home');
    Route::get('/app/profile/overview/todos', [ProfileOverviewController::class, 'todos'])->name('profile.todos');
    Route::get('/app/profile/overview/info/{page?}', [ProfileOverviewController::class, 'show'])->name('profile.info.page');
    Route::get('/app/profile/overview/notifications/', [ProfileOverviewController::class, 'notifications'])->name('profile.notifications');
    Route::get('/app/profile/overview/notes/', [ProfileOverviewController::class, 'notes'])->name('profile.notes');
    Route::post('/app/profile/notes/create', [ProfileNoteController::class, 'storeNote'])->name('profile.notes.create');
    Route::delete('/app/profile/notes/{note}', [ProfileNoteController::class, 'destroy'])->name('profile.notes.destroy');
    Route::put('/app/profile/todos/{id}/toggle', [ProfileTodoController::class, 'toggle'])->name('profile.todos.toggle');
});

Route::get('/auth/check', function () {
    return response()->json([
        'authenticated' => Auth::check(),
        'user' => Auth::user()
    ])->setStatusCode(Auth::check() ? 200 : 401);
})->name('auth.check');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
