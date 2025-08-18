<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Actions\Onboarding\GenerateProfilePages;

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
        $pages = [];
        $pregnancyWeek = $event->steps[4]['data']['stepFive']['pregnancy_week_number'] ?? null;
        $situationDate = $event->steps[3]['data']['stepFour']['situation_date'] ?? null;

        if ( $event->steps[1]['data']['stepTwo']['checks'] ) {
            $checks = $event->steps[1]['data']['stepTwo']['checks'];

            $pages = GenerateProfilePages::run($checks);
        }

        $event->user->pages()->createMany($pages);
    }
}
