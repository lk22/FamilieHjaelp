<?php

namespace Database\Factories;

use App\Models\OnboardingSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OnboardingSession>
 */
class OnboardingSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'session_token' => fake()->uuid(),
            'user_id' => null,
            'scenario' => 'default',
            'current_step' => 'welcome',
            'state' => null,
            'steps_data' => [],
            'form_data' => [],
            'completed' => false,
            'next_step' => null,
            'completed_at' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
