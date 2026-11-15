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
            'family_id' => rand(1, 10),
            'has_account' => rand(0, 1) === 1,
            'user_id' => rand(1, 10),
            'name' => fake()->name(),
            'family_role' => fake()->randomElement(['Far', 'Mor', 'Søn', 'Datter']),
            'age' => rand(0, 100),
            'email' => fake()->email(),
            'attached_email' => fake()->email(),
            'deleted_at' => rand(0, 1) === 1 ? now() : null,
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
