<?php
use Inertia\Inertia;
use App\Http\Controllers\ProfileOverviewController;
use App\Http\Controllers\ProfileNoteController;
use App\Http\Controllers\ProfileTodoController;
use Illuminate\Support\Facades\Route;

// Profile overview routes
Route::get('/app/profile/overview/', [ProfileOverviewController::class, 'show'])->name('profile.home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');

    Route::get('/app/profile/overview', [ProfileOverviewController::class, 'index'])->name('profile.home');
    Route::get('/app/profile/overview/todos', [ProfileOverviewController::class, 'todos'])->name('profile.todos');
    Route::get('/app/profile/overview/info/{page?}', [ProfileOverviewController::class, 'show'])->name('profile.info.page');
    Route::get('/app/profile/overview/notifications/', [ProfileOverviewController::class, 'notifications'])->name('profile.notifications');
    Route::get('/app/profile/overview/notes/', [ProfileOverviewController::class, 'notes'])->name('profile.notes');
    Route::post('/app/profile/notes/create', [ProfileNoteController::class, 'storeNote'])->name('profile.notes.create');
    Route::delete('/app/profile/notes/{note}', [ProfileNoteController::class, 'destroy'])->name('profile.notes.destroy');
    Route::put('/app/profile/todos/{id}/toggle', [ProfileTodoController::class, 'toggle'])->name('profile.todos.toggle');
});