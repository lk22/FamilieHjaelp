<?php

namespace Database\Factories;

use App\Models\Note;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'family_member_id' => \App\Models\FamilyMember::factory(),
            'family_id' => \App\Models\Family::factory(),
            'attached_family_member_id' => \App\Models\FamilyMember::factory(),
            'title' => $this->faker->sentence,
            'slug' => $this->faker->slug,
            'type' => $this->faker->randomElement(['general', 'health', 'appointment']),
            'note_content' => $this->faker->paragraph,
            'locale' => rand(0, 1) === 1 ? 'da' : 'en',
            'created_at' => $this->faker->dateTime,
        ];
    }
}
