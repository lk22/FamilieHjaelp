<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AppController;

/**
 * Public routes
 *
 * These routes are accessible to all users, including those who are not authenticated. They include the home page, informational pages, and the onboarding process for new users.
 * @routes - Home page: GET /
 * @routes - Help resources: GET /hjaelpemidler
 * @routes - Our mission: GET /vores-mission
 * @routes - User experiences: GET /har-du-oplevet/abort, GET /har-du-oplevet/doedfødsel, GET /har-du-oplevet/foraeldre, GET /har-du-oplevet/mistet-familie-medlem
 * @routes - Getting started guide: GET /kom-igang
 */
Route::group([
    'middleware' => ['web'],
    'prefix' => '/{locale?}',
    'where' => ['locale' => '[a-zA-Z]{2}']
], function () {
    Route::get('/', [PageController::class, 'home'])->name('home');
    Route::get('/hjaelpemidler', [PageController::class, 'helpResources'])->name('page.help-resources');
    Route::get('/vores-mission', [PageController::class, 'ourMission'])->name('page.our-mission');
    Route::get('/funktioner', [PageController::class, 'ourFunctions'])->name('page.functions');
    Route::get('/har-du-oplevet/abort', [PageController::class, 'abortionExperience'])->name('page.experiences.abortion');
    Route::get('/har-du-oplevet/doedfoedsel', [PageController::class, 'stillbirthExperience'])->name('page.experiences.stillbirth');
    Route::get('/har-du-oplevet/foraeldre', [PageController::class, 'newParentsExperience'])->name('page.experiences.new-parents');
    Route::get('/har-du-oplevet/mistet-familie-medlem', [PageController::class, 'lostFamilyMemberExperience'])->name('page.experiences.lost-family-member');
    Route::get('/kom-igang', [PageController::class, 'gettingStarted'])->name('page.getting-started');
    Route::get('/historier', [PageController::class, 'stories'])->name('page.stories');
    Route::get('/app', [AppController::class, 'home'])->name('app.home');
});

require __DIR__.'/onboarding.php';
require __DIR__.'/profile.php';

Route::get('/auth/check', function () {
    return response()->json([
        'authenticated' => Auth::check(),
        'user' => Auth::user()
    ])->setStatusCode(Auth::check() ? 200 : 401);
})->name('auth.check');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
