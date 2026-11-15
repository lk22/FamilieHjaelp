<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;

use Mockery;
use App\Repositories\OnboardingSessionRepository;
use App\Contracts\OnboardingSessionRepositoryContract;

use App\Models\OnboardingSession;

use Illuminate\Foundation\Testing\RefreshDatabase;

class OnboardingSessionRepositoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_onboarding_session_repository_contract_implementation(): void {
        $this->assertInstanceOf(
            OnboardingSessionRepositoryContract::class,
            new OnboardingSessionRepository()
        );
    }

    public function test_onboarding_repository_can_find_onboarding_session_by_token(): void {
      $repository = new OnboardingSessionRepository();

      $session = OnboardingSession::factory()->create([
        'session_token' => 'token'
      ]);

      $model = $repository->findBySessionToken($session->session_token);

      $this->assertInstanceOf(OnboardingSession::class, $model);
    }

    public function test_onboarding_repository_can_update_onboarding_session_if_it_exists(): void {
      $session = OnboardingSession::factory()->create();
      $repository = new OnboardingSessionRepository();

      $result = $repository->updateSession($session, ['current_step' => 'new_step']);

      $this->assertTrue($result);
      $this->assertDatabaseHas('onboarding_sessions', [
        'id' => $session->id,
        'current_step' => 'new_step'
      ]);
    }

    public function test_onboarding_repository_can_update_onboarding_session_if_it_exists_returns_true(): void {
      $session = OnboardingSession::factory()->create();

      $repository = new OnboardingSessionRepository();

      $result = $repository->updateSession($session, [
          'current_step' => 'next_step',
      ]);

      $this->assertTrue($result);

      $this->assertDatabaseHas('onboarding_sessions', [
          'id' => $session->id,
          'current_step' => 'next_step',
      ]);
    }

    public function test_onboarding_repository_can_mark_existing_session_as_complete(): void {
      $session = OnboardingSession::factory()->create(
        [
          'completed' => false
        ]
      );

      $repository = new OnboardingSessionRepository();
      $result = $repository->markSessionAsComplete($session);
      $this->assertTrue($result);

      $this->assertDatabaseHas('onboarding_sessions', [
        'id' => $session->id,
        'completed' => true
       ]);
    }

    public function test_onboarding_repository_can_check_if_session_is_active(): void {
      $session = OnboardingSession::factory()->create([
        'completed' => false
      ]);

      $repository = new OnboardingSessionRepository();
      $isActive = $repository->isActiveSession($session->session_token);

      $this->assertTrue($isActive);

      $session->markAsCompleted();
      $isActive = $repository->isActiveSession($session->session_token);

      $this->assertFalse($isActive);
    }

    public function test_onboarding_repository_can_create_new_session(): void {
      $repository = new OnboardingSessionRepository();
      $session = $repository->createSession('en');

      $this->assertInstanceOf(OnboardingSession::class, $session);
      $this->assertDatabaseHas('onboarding_sessions', [
        'id' => $session->id,
        'locale' => 'en'
      ]);
    }

    public function test_onboarding_session_repository_can_find_existing_session_by_token(): void {
      $session = OnboardingSession::factory()->create();

      $repository = new OnboardingSessionRepository();
      $foundSession = $repository->findBySessionToken($session->session_token);

      $this->assertInstanceOf(OnboardingSession::class, $foundSession);
      $this->assertEquals($session->id, $foundSession->id);
    }
}