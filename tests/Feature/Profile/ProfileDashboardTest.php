<?php

namespace Tests\Feature\Profile;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileDashboardTest extends TestCase
{
  use RefreshDatabase;

  public function test_profile_dashboard_can_be_rendered()
  {
      $response = $this->get(route('profile.dashboard'));

      $response->assertStatus(200);
  }
}