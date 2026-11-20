<?php

namespace Tests\Feature\Profile;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileDashboardTest extends TestCase
{
  use RefreshDatabase;

  public function test_profile_dashboard_can_be_rendered()
  {
      $this->actingAs(\App\Models\User::factory()->create());
      $response = $this->get(route('profile.home'));
      $response->assertStatus(200);
  }
}