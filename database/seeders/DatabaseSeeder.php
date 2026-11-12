<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * This will create families, family members, users for each member,
     * and children for each family.
     */
    public function run(): void {

        // make sure we are not in production before seeding
        if (app()->environment('production')) {
            die("You are in production mode, you cannot seed the database");
        }

        // Disable foreign key checks to allow truncating and seeding tables without constraint issues
        $this->disableForeignKeyChecks();

        $families = \App\Models\Family::factory(10)->create();

        foreach ($families as $family) {
            \App\Models\FamilyMember::factory(rand(1, 2))->create([
                'name' => fake()->name(),
                'family_id' => $family->id
            ]);

            foreach ($family->members as $member) {
                \App\Models\User::factory()->create([
                    'email' => $member->email,
                    'password' => bcrypt('password'),
                    'name' => $member->name,
                    'has_completed_onboarding' => true,
                    'family_id' => $member->family_id,
                    'family_member_id' => $member->id
                ]);
            }

            \App\Models\FamilyChild::factory(rand(1,5))->create([
                'family_id' => $family->id
            ]);

            foreach ($family->children as $child) {
                if ( $child->needs_user_access || ($child->needs_user_access && $child->use_attached_parent_email ) ) {
                    \App\Models\User::factory()->create([
                        'email' => $child->attached_parent_email ?? $child->child_email,
                        'password' => bcrypt('password'),
                        'name' => $child->name,
                        'has_completed_onboarding' => true,
                        'family_id' => $child->family_id,
                        'family_child_id' => $child->id,
                    ]);
                }
            }
        }
    }

    private function disableForeignKeyChecks(): void {
        DB::statement('TRUNCATE TABLE families RESTART IDENTITY CASCADE');
        DB::statement('TRUNCATE TABLE family_members RESTART IDENTITY CASCADE');
        DB::statement('TRUNCATE TABLE family_children RESTART IDENTITY CASCADE');
    }
}
