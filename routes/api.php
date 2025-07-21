<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CompleteOnboardingController;
use App\Http\Controllers\TodoApiController;

Route::get('/health/auth', function () {
    if ( ! auth()->check() ) {
        return response()->json(['message' => 'Not authenticated'], 401);
    }
    
    return response()->json(['message' => 'Authenticated'], 200);
})->name('api.auth.check');

Route::post('/onboarding/process/complete/todos', [CompleteOnboardingController::class, 'storeTodos'])
    ->name('api.onboarding.process.complete.todos');
Route::post('/onboarding/process/complete', [CompleteOnboardingController::class, '__invoke'])->name('api.onboarding.process.complete');

Route::put('/profile/todos/{id}/toggle', [TodoApiController::class, 'toggle'])->name('profile.todos.toggle');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
    