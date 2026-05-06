<?php

namespace Tests\Feature\Onboarding;

use App\Services\OnboardingSessionService;

use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OnboardingSessionServiceTest extends TestCase
{
  use RefreshDatabase;

  public function test_onboarding_session_service_can_generate_token()
  {
    $service = app()->make(OnboardingSessionService::class);

    $token = $service->generateToken();
    $this->assertNotEmpty($token);
    $this->assertEquals(36, strlen($token)); // UUID length
    $this->assertEquals(4, substr_count($token, '-')); // UUID format
  }

  public function test_onboarding_session_service_can_find_or_create_session_for_guest()
  {
    $service = app()->make(OnboardingSessionService::class);

    $session = $service->findOrCreateSession(null, null);

    $this->assertNotNull($session);
    $this->assertNull($session->user_id);
    $this->assertNotEmpty($session->session_token);
  }

  public function test_onboarding_session_service_can_find_or_create_session_for_authenticated_user()
  {
    $user = User::factory()->create();
    $service = app()->make(OnboardingSessionService::class);

    $session = $service->findOrCreateSession($user->id, null);

    $this->assertNotNull($session);
    $this->assertEquals($user->id, $session->user_id);
    $this->assertNotEmpty($session->session_token);
  }

  public function test_onboarding_session_service_can_link_existing_session_to_authenticated_user()
  {
    $user = User::factory()->create();
    $service = app()->make(OnboardingSessionService::class);

    // create a session for guest
    $session = $service->findOrCreateSession(null, null);

    // link session to authenticated user
    $linkedSession = $service->linkSessionToUser($session, $user);

    $this->assertNotNull($linkedSession);
    $this->assertEquals($user->id, $linkedSession->user_id);
  }

  public function test_onboarding_session_service_can_mark_session_as_completed()
  {
    $service = app()->make(OnboardingSessionService::class);

    $session = $service->findOrCreateSession(null, null);
    $completedSession = $service->markSessionAsCompleted($session);

    $this->assertNotNull($completedSession);
    $this->assertTrue($completedSession->completed);
    $this->assertEquals(now()->toDateTimeString(), $completedSession->completed_at->toDateTimeString());
  }
}