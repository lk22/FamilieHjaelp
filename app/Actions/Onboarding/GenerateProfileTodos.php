<?php

namespace App\Actions\Onboarding;

use Lorisleiva\Actions\Concerns\AsAction;

class GenerateProfileTodos
{
    use AsAction;

    /**
     * Generate the todos for the user based on the completed onboarding steps.
     *
     * @return array
     */
    public function handle(
        array $steps,
        ?array $situationChecks,
        ?int $pregnancyWeek,
        ?string $formattedDate
    ): array
    {
        $todos = [];

        if (in_array('deathborn', $situationChecks) || in_array('abort', $situationChecks)) {
            $todos = $this->prepareDeathbornAbortionTodos($pregnancyWeek, $formattedDate);
        } else if (in_array('is_parents', $situationChecks)) {
            $todos = $this->prepareParentingTodos();
        }

        return $todos;
    }

    private function prepareParentingTodos(): array
    {
        return [
            // Add parenting related todos here
        ];
    }

    /**
     * Prepare todos for abortion or deathborn situations.
     *
     * @return array<array<string, mixed>>
     */
    private function prepareDeathbornAbortionTodos(
        $pregnancyWeek,
        $formattedDate
    ): array
    {
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
            ],
            [
                'title' => 'Planlæg begravelse eller bisættelse',
                'description' => 'Planlægning af begravelse eller bisættelse for dit barn kan være hårdt og gå igennem som, dette kan gøres ved at kontakte en bedemand eller kommunen',
                'is_completed' => false,
                'due_date' => null,
                'link' => '',
                'complted_at' => null
            ],
            [
                'title' => 'Søg begravelseshjælp',
                'description' => 'Hvis du har mistet et barn, kan du søge om begravelseshjælp. Dette kan gøres online eller via blanket "Søg begravelseshjælp" som kan findes på borger.dk eller ved at kontakt en bedemand.',
                'is_completed' => false,
                'due_date' => $deathbornDueDate ?? null,
                'link' => route('profile.info.page', ['page' => 'begravelse-eller-bisaettelse']),
                'completed_at' => null
            ]
        ];
    }
}