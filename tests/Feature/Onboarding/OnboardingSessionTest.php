<?php

namespace Tests\Feature\Onboarding;

use App\Models\OnboardingSession;
// use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OnboardingSessionTest extends TestCase
{
  use RefreshDatabase;

  public function test_onboarding_session_model_has_expected_fillables()
  {
    $session = new OnboardingSession();

    $this->assertEquals([
        'session_token',
        'user_id',
        'scenario',
        'current_step',
        'state',
        'steps_data',
        'form_data',
        'completed',
        'next_step',
    ], $session->getFillable());
  }

  public function test_onboarding_session_model_has_expected_casts()
  {
    $session = new OnboardingSession();

    $this->assertEquals([
        'steps_data' => 'array',
        'form_data' => 'array',
        'completed' => 'boolean',
        'completed_at' => 'datetime',
        'next_step' => 'string',
        'id' => 'int'
    ], $session->getCasts());
  }

  public function test_onboarding_session_belongs_to_user()
  {
    $session = new OnboardingSession();

    $this->assertTrue(method_exists($session, 'user'));
    $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\BelongsTo::class, $session->user());
  }

  public function test_onboarding_session_can_be_created_for_guest()
  {
    $response = $this->get('/getting-started');
    $session = OnboardingSession::first();

    $response->assertStatus(200);
    $this->assertDatabaseCount('onboarding_sessions', 1);
    $this->assertNotNull($session);
    $this->assertNull($session->user_id);
    $this->assertNotEmpty($session->session_token);
  }
}