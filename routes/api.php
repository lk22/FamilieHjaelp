<?php

use App\Http\Controllers\CompleteOnboardingController;
use App\Http\Controllers\Onboarding\CreateFamilyController;
use App\Http\Controllers\Onboarding\CreateFamilyParentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health/auth', function () {
    if (! auth()->check) {
        return response()->json(['message' => 'Not authenticated'], 401);
    }

    return response()->json(['message' => 'Authenticated'], 200);
})->name('api.auth.check')->middleware('auth');

Route::get('/onboarding/token/verify', [CompleteOnboardingController::class, 'verifyToken'])
    ->name('api.onboarding.process.complete.token.verify');

Route::post('/onboarding/family/create', [CreateFamilyController::class, '__invoke'])
    ->name('api.onboarding.family.create');

Route::post('/onboarding/family/create/parents', [CreateFamilyParentsController::class, '__invoke'])
    ->name('api.onboarding.family.create.parents');

// Route::post('/onboarding/family/create/children', [CreateFamilyChildrenController::class, '__invoke'])
//     ->name('api.onboarding.family.create.children');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/onboarding/process/complete/todos', [CompleteOnboardingController::class, 'storeTodos'])
        ->name('api.onboarding.process.complete.todos');
    Route::post('/onboarding/process/complete/pages', [CompleteOnboardingController::class, 'storePages'])
        ->name('api.onboarding.process.complete.pages');
    Route::post('/onboarding/process/complete', [CompleteOnboardingController::class, '__invoke'])->name('api.onboarding.process.complete');
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
