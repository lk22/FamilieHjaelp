<?php

namespace App\Listeners;

use App\Actions\Onboarding\GenerateProfileTodos;
use App\Events\StoreUserTodos;

class HandleStoreUserTodos
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
    public function handle(StoreUserTodos $event): void
    {
        $user = $event->user;
        $steps = $event->steps;
        $situationChecks = $steps[1]['data']['stepTwo']['checks'] ?? [];
        $pregnancyWeek = $steps[4]['data']['stepFive']['pregnancy_week_number'] ?? null;
        $situationDate = $steps[3]['data']['stepFour']['situation_date'] ?? null;
        $formattedDate = $situationDate ? date('Y-m-d', strtotime($situationDate)) : null;

        $preparedTodos = GenerateProfileTodos::run(
            $steps,
            $situationChecks,
            $pregnancyWeek,
            $formattedDate
        );

        $user->todos()->createMany($preparedTodos);
    }
}
