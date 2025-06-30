<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PageController;
use App\Http\Controllers\OnboardingController;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/getting-started', [PageController::class, 'gettingStarted'])->name('getting-started');

Route::get('/onboarding/{step?}', [OnboardingController::class, 'render'])
    ->name('onboarding.step');
Route::post('/onboarding/{step?}', [OnboardingController::class, 'submitStep'])
    ->name('onboarding.step.submit');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
