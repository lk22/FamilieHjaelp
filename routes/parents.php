<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ParentsProfileController;
use App\Http\Controllers\ParentsEventsController;
use App\Http\Controllers\ParentsChildrenController;
use App\Http\Controllers\ParentsActivityController;

Route::group(['prefix' => '/profile/overview/parents'], function() {
    // children routes
    Route::get('/', [ParentsProfileController::class, 'index'])->name('profile.parents.home');
    Route::get('/children', [ParentsChildrenController::class, 'index'])->name('profile.parents.children.index');
    Route::get('/children/{chilld}', [ParentsChildrenController::class, 'show'])->name('profile.parents.children.show');
    Route::get('/children/create', [ParentsChildrenController::class, 'create'])->name('profile.parents.children.create');
    Route::get('/children/{Child}/edit', [ParentsChildrenController::class, 'edit'])->name('profile.parents.children.edit');
    Route::post('children', [ParentsChildrenController::class, 'store'])->name('profile.parents.children.store');
    Route::put('/children/{Child}', [ParentsChildrenController::class, 'store'])->name('profile.parents.children.update');
    Route::delete('/children/{Child}', [ParentsChildrenController::class, 'delete'])->name('profile.parents.children.delete');

    // Events routes
    Route::get('/events', [ParentsEventsController::class, 'index'])->name('profile.parents.events.index');
    Route::get('/events/{Event}', [ParentsEventsController::class, 'show'])->name('profile.parents.events.show');
    Route::get('/events/create', [ParentsEventsController::class, 'create'])->name('profile.parents.events.create');
    Route::get('/events/{Child}/edit', [ParentsEventsController::class, 'edit'])->name('profile.parents.events.edit');
    Route::post('/events', [ParentsEventsController::class, 'store'])->name('profile.parents.events.store');
    Route::put('/events/{Child}/edit', [ParentsEventsController::class, 'update'])->name('profile.parents.events.update');
    Route::delete('/events/{Child}', [ParentsEventsController::class, 'delete'])->name('profile.parents.events.delete');

    // Activity routes
    Route::get('/activities', [ParentsActivityController::class, 'index'])->name('profile.parents.activities.index');
    Route::get('/activities/{Activity}', [ParentsActivityController::class, 'show'])->name('profile.parents.activities.show');
    Route::get('/activities/create', [ParentsActivityController::class, 'create'])->name('profile.parents.activities.create');
    Route::get('/activities/{Child}/edit', [ParentsActivityController::class, 'edit'])->name('profile.parents.activities.edit');
    Route::post('/activities', [ParentsActivityController::class, 'store'])->name('profile.parents.activities.store');
    Route::put('/activities/{Child}/edit', [ParentsActivityController::class, 'update'])->name('profile.parents.activities.update');
    Route::delete('/activities/{Child}', [ParentsActivityController::class, 'delete'])->name('profile.parents.activities.delete');
});