<?php

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\ProfileOverviewController;
use App\Http\Controllers\CompleteOnboardingController;
use App\Http\Controllers\ProfileTodoController;
use App\Http\Controllers\ProfileNoteController;

Route::get('/', [PageController::class, 'home'])
->name('home');

Route::get('/getting-started', [PageController::class, 'gettingStarted'])->name('getting-started')->middleware(['guest']);

/**
 * Onboarding routes
*/
Route::get('/onboarding', [OnboardingController::class, 'render'])->name('onboarding.step');

Route::get('/getting-started', [OnboardingController::class, 'show'])->middleware('guest')->name('getting-started');
Route::get('/onboarding/{scenario}/step/{step}', [OnboardingController::class, 'showStep'])->name('onboarding.scenario.step');
Route::post('/onboarding/{scenario}/step/{step}', [OnboardingController::class, 'submitStep'])->name('onboarding.scenario.step.submit');
Route::get('/onboarding/confirmation', [OnboardingController::class, 'showConfirmation'])->name('onboarding.confirmation');
Route::get('/onboarding/completed', [OnboardingController::class, 'showCompleted'])->name('onboarding.completed.view');


Route::post('/onboarding/{scenario}/update-step/{step}', [OnboardingController::class, 'updateStep'])->name('onboarding.scenario.update-step');

Route::get('/onboarding/reset', [OnboardingController::class, 'reset'])->name('onboarding.reset');
Route::post('/onboarding/completed', [OnboardingController::class, 'complete'])->name('onboarding.completed');

/**
 * Completing onboarding process routes
 */
Route::post('/onboarding/process/complete/todos', [CompleteOnboardingController::class, 'storeTodos'])->name('onboarding.process.complete.todos');
Route::post('/onboarding/process/complete/pages', [CompleteOnboardingController::class, 'storePages'])->name('onboarding.process.complete.pages');
Route::post('/onboarding/process/complete', [CompleteOnboardingController::class, '__invoke'])->name('onboarding.process.complete');

// Profile overview routes
Route::get('/profile/overview/', [ProfileOverviewController::class, 'show'])->name('profile.home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/profile/overview', [ProfileOverviewController::class, 'index'])->name('profile.home');
    Route::get('/profile/overview/todos', [ProfileOverviewController::class, 'todos'])->name('profile.todos');
    Route::get('/profile/overview/info/{page?}', [ProfileOverviewController::class, 'show'])->name('profile.info.page');
    Route::get('/profile/overview/notifications/', [ProfileOverviewController::class, 'notifications'])->name('profile.notifications');
    Route::get('/profile/overview/notes/', [ProfileOverviewController::class, 'notes'])->name('profile.notes');
    Route::post('/profile/notes/create', [ProfileNoteController::class, 'storeNote'])->name('profile.notes.create');
    Route::delete('/profile/notes/{note}', [ProfileNoteController::class, 'destroy'])->name('profile.notes.destroy');
    Route::put('/profile/todos/{id}/toggle', [ProfileTodoController::class, 'toggle'])->name('profile.todos.toggle');
});

Route::get('/auth/check', function () {
    return response()->json([
        'authenticated' => Auth::check(),
        'user' => Auth::user()
    ])->setStatusCode(Auth::check() ? 200 : 401);
})->name('auth.check');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
