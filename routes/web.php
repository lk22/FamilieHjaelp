<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PageController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\CompleteOnboardingController;

\Auth::loginUsingId(1);

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/getting-started', [PageController::class, 'gettingStarted'])->name('getting-started');

/**
 * Onboarding routes
 */
Route::get('/onboarding', [OnboardingController::class, 'render'])->name('onboarding.step');
Route::get('/onboarding/reset', [OnboardingController::class, 'reset'])->name('onboarding.reset');
Route::get('/onboarding/complete', [OnboardingController::class, 'completed'])->name('onboarding.complete');
Route::post('/onboarding', [OnboardingController::class, 'submitStep'])->name('onboarding.step.submit');
Route::post('/onboarding/complete', [OnboardingController::class, 'complete'])->name('onboarding.complete');

Route::get('/profile/overview', [ProfileOverviewController::class, 'overview'])->name('profile.home');

Route::post('/onboarding/process/complete', [CompleteOnboardingController::class, '__invoke'])->name('onboarding.process.complete');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
