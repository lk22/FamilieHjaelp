<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagsResourceTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_visit_the_tags_resource(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/admin/tags')
            ->assertOk();
    }
}
