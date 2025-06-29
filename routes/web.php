<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PageController;
use App\Http\Controllers\OnboardingController;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/getting-started', [PageController::class, 'gettingStarted'])->name('getting-started');

Route::get('/onboarding/{step?}', [OnboardingController::class, '__invoke'])
    ->name('onboarding.step');

Route::group(['prefix' => 'onboarding'], function() {
    Route::get('/?step={step}', [OnboardingController::class, '__invoke'])->name('onboarding');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
