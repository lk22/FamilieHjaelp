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
        $startTime = microtime(true);
        $this->renderFamilieHjaelpTerminalLogo();
        // make sure we are not in production before seeding
        if (app()->environment('production')) {
            die("You are in production mode, you cannot seed the database");
        }

        echo "Disabling foreing key checks in the database";

        // Disable foreign key checks to allow truncating and seeding tables without constraint issues
        $this->disableForeignKeyChecks();

        echo "\n\nForeign key checks disabled";

        echo "\n\n Creating Demo family";
        $family = \App\Models\Family::factory()->create(
            [
                'name' => 'Laursen Knudsen',
                'family_size' => 3,
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
                'children_count' => 1
            ]
        );

        echo "\n\nSeeding Family members";
        echo "\n--------------------------------------------------------";

        $mainParentUser = \App\Models\User::factory()->create([
            'email' => 'leoknudsen30@example.com',
            'password' => bcrypt('password'),
            'name' => 'Leo Knudsen',
            'has_completed_onboarding' => true,
            'family_id' => $family->id,
            'family_child_id' => null,
            'is_admin' => false
        ]);
        echo "\n Parent " . $mainParentUser->name . " created in family " . $family->name;

        $partnerUser = \App\Models\User::factory()->create([
            'email' => 'partner@familiehjælp.com',
            'password' => bcrypt('password'),
            'name' => 'Partner Name',
            'has_completed_onboarding' => true,
            'family_id' => $family->id,
            'family_member_id' => null,
            'family_child_id' => null,
            'is_admin' => false
        ]);

        echo "\n Partner " . $partnerUser->name . " created in family " . $family->name;

        $family->members()->createMany([
            [
                'family_id' => $family->id,
                'name' => 'Leo Knudsen',
                'family_role' => 'Far',
                'age' => 33,
                'email' => 'leoknudsen30@example.com',
                'attached_email' => 'leoknudsen30@example.com',
                'user_id' => $mainParentUser->id,
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null
            ],
            [
                'family_id' => $family->id,
                'name' => 'Partner Name',
                'family_role' => 'Mor',
                'age' => 30,
                'email' => 'partner@example.com',
                'attached_email' => 'partner@example.com',
                'user_id' => $partnerUser->id,
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null
            ]
        ]);

        echo "\n Creating Demo child";

        $child = $family->children()->create([
            'family_id' => $family->id,
            'name' => 'Olivia Laursen Knudsen.',
            'age_year' => 5,
            'age_months' => 6,
            'age_weeks' => 2,
            'needs_user_access' => false,
            'use_attached_parent_email' => true,
            'attached_parent_email' => 'leoknudsen30@example.com',
            'child_email' => 'leoknudsen30jr@example.com',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null
        ]);

        echo "\n Demo child " . $child->name . " created in family " . $family->name;

        $families = \App\Models\Family::factory(10)->create();
        echo "\n-------------------------------------------------------------";
        echo "\n Creating additional demo families";
        echo "\n-------------------------------------------------------------";

        foreach ($families as $family) {
            echo "\n\nSeeding family " . $family->name;
            echo "\n\nSeeding family members for " . $family->name;
            \App\Models\FamilyMember::factory(rand(1, 2))->create([
                'name' => fake()->name(),
                'family_id' => $family->id
            ]);

            echo "\n Created " . count($family->members) . " family members for " . $family->name;

            foreach ($family->members as $member) {
                echo "\n Creating user for family member " . $member->name;
                \App\Models\User::factory()->create([
                    'email' => $member->email,
                    'password' => bcrypt('password'),
                    'name' => $member->name,
                    'has_completed_onboarding' => true,
                    'family_id' => $member->family_id,
                    'family_member_id' => $member->id
                ]);
            }

            echo "\n\nSeeding children for " . $family->name;

            \App\Models\FamilyChild::factory(rand(1,5))->create([
                'family_id' => $family->id
            ]);

            foreach ($family->children as $child) {
                echo "\n Creating user for child " . $child->name;
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
            echo "\n Finished seeding family " . $family->name;
            echo "\n--------------------------------------------------------";
        }

        echo "\n\n Demo data seeded successfully";
        echo "Data seeding took: " . (microtime(true) - $startTime) . " seconds";
    }

    /**
     *
     *
     * @return void
     */
    private function disableForeignKeyChecks(): void {
        DB::statement('TRUNCATE TABLE families RESTART IDENTITY CASCADE');
        DB::statement('TRUNCATE TABLE family_members RESTART IDENTITY CASCADE');
        DB::statement('TRUNCATE TABLE family_children RESTART IDENTITY CASCADE');
        DB::statement('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    }

    private function renderFamilieHjaelpTerminalLogo(): void {
        $logoPath = base_path('public/images/logo.svg');

        // Create a text-based representation inspired by the SVG logo
        $logo = <<<'ASCII'

    ╔═══════════════════════════════════════════════════════════════════════════╗
    ║                                                                           ║
    ║                          FamilieHjælp                                     ║
    ║                                                                           ║
    ║                      Seeding Database Families                            ║
    ║                                                                           ║
    ║                      Brought to life with care                            ║
    ║                                                                           ║
    ╚═══════════════════════════════════════════════════════════════════════════╝

    ASCII;
        echo $logo . "\n";
    }
}
