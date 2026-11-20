<?php

namespace Database\Factories;

use App\Models\FamilyMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FamilyMember>
 */
class FamilyMemberFactory extends Factory
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
            'has_account' => 1,
            'user_id' => \App\Models\User::factory(),
            'name' => fake()->name(),
            'family_role' => fake()->randomElement(['Far', 'Mor', 'Søn', 'Datter']),
            'age' => rand(0, 100),
            'email' => fake()->email(),
            'attached_email' => fake()->email(),
            'deleted_at' => null,
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
