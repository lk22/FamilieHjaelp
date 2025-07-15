<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CompleteOnboardingController;

Route::post('/onboarding/process/complete', [CompleteOnboardingController::class, '__invoke'])->name('api.onboarding.process.complete');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
