<?php

namespace App\Providers;

use App\Events\StoreUserPages;
// Events
use App\Events\StoreUserTodos;
use App\Listeners\HandleStoreUserPages;
// Listeners
use App\Listeners\HandleStoreUserTodos;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        StoreUserPages::class => [
            HandleStoreUserPages::class,
        ],
        StoreUserTodos::class => [
            HandleStoreUserTodos::class,
        ],
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
