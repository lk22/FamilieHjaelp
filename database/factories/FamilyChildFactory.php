<?php

namespace Database\Factories;

use App\Models\FamilyChild;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FamilyChild>
 */
class FamilyChildFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'family_id' => rand(1, 10),
            'name' => fake()->name(),
            'age_year' => rand(0, 99),
            'age_month' => rand(0, 12),
            'age_weeks' => rand(0, 52),
            'needs_user_access' => rand(0, 1) === 1,
            'child_email' => fake()->email(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
