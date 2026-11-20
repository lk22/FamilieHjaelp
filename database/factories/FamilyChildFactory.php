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
            'family_id' => \App\Models\Family::factory(),
            'name' => fake()->name(),
            'age_year' => rand(0, 18),
            'age_months' => rand(0, 11),
            'age_weeks' => rand(0, 4),
            'needs_user_access' => false,
            'use_attached_parent_email' => true,
            'child_email' => fake()->email(),
            'attached_parent_email' => fake()->email(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
