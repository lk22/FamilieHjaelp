<?php

namespace App\Listeners;

use App\Events\StoreUserTodos;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Events\StoreUserPages;

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
        $preparedTodos = [];

        $formattedDate = $situationDate ? date('Y-m-d', strtotime($situationDate)) : null;

        if (
            in_array('deathborn', $situationChecks) ||
            in_array('abort', $situationChecks) && 
            $pregnancyWeek >= 22
        ) {
            $preparedTodos = $this->initializeAbortDeathbornTodos($formattedDate);
        }

        $user->todos()->createMany($preparedTodos);
    }

    /**
     * Initialize todos for abortion or deathborn situations.
     *
     * @return array<array<string, mixed>>
     */
    private function initializeAbortDeathbornTodos(?string $formattedDate): array {

        $deathbornDueDate = $formattedDate ? date('Y-m-d', strtotime($formattedDate . ' + 30 days')) : null;
        $registerFathershipDueDate = $formattedDate ? date('Y-m-d', strtotime($formattedDate . ' + 4 weeks')) : null;

        return [
            [
                'title' => 'Anmeldelse af dødfødsel',
                'description' => 'Hvis du har mistet et barn, kan du anmelde dødfødsel til myndighederne. Dette kan gøres online eller ved at henvende dig til kirkekontoret i dit kirkesogn.',
                'is_completed' => false,
                'due_date' => $deathbornDueDate ?? null,
                'link' => 'https://www.borger.dk/borger/boern-og-unge/boern-og-unge/boern-og-unge/boern-og-unge/dodfodsel',
                'completed_at' => null
            ],
            [
                'title' => 'Registrering af forældreskab',
                'description' => 'Hvis du ikke er gift med barnets anden forælder, skal du registrere forældreskabet. Dette kan gøres online eller ved at henvende dig til kommunen.',
                'is_completed' => false,
                'due_date' => $registerFathershipDueDate ?? null,
                'link' => 'https://www.borger.dk/borger/boern-og-unge/boern-og-unge/boern-og-unge/boern-og-unge/forældreskab',
                'completed_at' => null
            ]
        ];
    }
}
