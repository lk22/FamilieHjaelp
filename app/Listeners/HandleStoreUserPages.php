<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Events\StoreUserPages;

class HandleStoreUserPages
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(StoreUserPages $event): void
    {
        if ($event instanceof StoreUserPages) {
            $user = $event->user;
            $onboardingData = $event->onboardingData;

            // Handle the onboarding data for the user
        }
    }
}
