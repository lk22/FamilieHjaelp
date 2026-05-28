<?php
use App\Http\Controllers\CompleteOnboardingController;
use App\Http\Controllers\OnboardingController;
use Illuminate\Support\Facades\Route;

/**
 * Onboarding routes
*/
Route::get('/app/onboarding', [OnboardingController::class, 'show'])->name('onboarding.step');
Route::get('/app/getting-started', [OnboardingController::class, 'show'])->middleware('guest')->name('app.getting-started');
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