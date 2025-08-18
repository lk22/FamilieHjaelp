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
    public function handle(array $completedSteps): array
    {
        $todos = [];
        // Add more todos based on other steps as needed

        return $todos;
    }
}