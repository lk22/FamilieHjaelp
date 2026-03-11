<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// Events
use App\Events\StoreUserPages;
use App\Events\StoreUserTodos;

// Listeners
use App\Listeners\HandleStoreUserPages;
use App\Listeners\HandleStoreUserTodos;

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
