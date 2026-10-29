<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\TestCase;
use App\Services\OnboardingService;
use App\Repositories\OnboardingSessionRepository;
use App\Models\OnboardingSession;
use Mockery;

use App\Exceptions\OnboardingStepException;

class OnboardingSessionServiceTest extends TestCase
{
  use RefreshDatabase;

  public function test_service_can_check_find_session_by_token()
  {
    $session = 'some_session_token';
    $onboardingSession = new OnboardingSession;

    $service = Mockery::mock(OnboardingService::class);
    $service->shouldReceive('findBySessionToken')
      ->with($session)
      ->andReturn($onboardingSession);

    $this->assertEquals($onboardingSession, $service->findBySessionToken($session));
  }

  public function test_service_can_check_active_session()
  {
    $session = 'some_session_token';

    $mockedService = Mockery::mock(OnboardingService::class);
    $mockedService->shouldReceive('checkActiveSession')
      ->with($session)
      ->andReturn(false);

    $this->assertFalse($mockedService->checkActiveSession($session));
  }

  public function test_service_can_create_session_if_session_does_not_exist()
  {
    $token = null;
    $userId = null;
    $locale = null;

    $repository = Mockery::mock(OnboardingSessionRepository::class);
    $repository->shouldReceive('findBySessionToken')
        ->once()
        ->with($token)
        ->andReturn(null);

    $repository->shouldReceive('createSession')
        ->once()
        ->with($locale)
        ->andReturn($newSession = new OnboardingSession);

    $service = new OnboardingService($repository);

    $this->assertInstanceOf(OnboardingSession::class, $service->findOrCreateSession($userId, $token, $locale));
  }

  public function test_service_returns_existing_session_if_it_exists()
  {
    $token = "giepkgpoewkgew-kgoepkgpewkpgew";
    $existingSession = new OnboardingSession();

    $repository = Mockery::mock(OnboardingSessionRepository::class);
    $repository->shouldReceive('findBySessionToken')
        ->once()
        ->with($token)
        ->andReturn($existingSession);

    $service = new OnboardingService($repository);
    $result = $service->findOrCreateSession(null, $token, null);
    $this->assertEquals($existingSession, $result);
  }

  public function test_service_can_submit_given_step()
  {
    $session = 'some_session_token';
    $step = 'some_step';

    $service = Mockery::mock(OnboardingService::class);
    $service->shouldAllowMockingMethod('submitStep');
    $service->shouldReceive('submitStep')
      ->with(['session_token' => $session], "next_step", "scenario", $step)
      ->andReturn(true);

    $this->assertTrue($service->submitStep(['session_token' => $session], "next_step", "scenario", $step));
  }

  public function test_service_does_not_submit_step_if_session_is_invalid(): void
{
    $session = 'gkoew032-gjioewgoe0-ngoiejgew';
    $step = 'some_step';

    $repository = Mockery::mock(OnboardingSessionRepository::class);

    $repository->shouldReceive('findBySessionToken')
        ->once()
        ->with($session)
        ->andReturn(null);

    $repository->shouldNotReceive('updateSession');

    $service = new OnboardingService($repository);

    $this->expectException(OnboardingStepException::class);
    $this->expectExceptionMessage('Onboarding session not found.');

    $service->submitStep(
        ['sessionToken' => $session],
        'next_step',
        'scenario',
        $step
    );
}

  public function test_service_can_update_session()
  {
    $session = 'some_session_token';
    $updatedData = ['key' => 'value'];

    $service = Mockery::mock(OnboardingService::class);
    $service->shouldAllowMockingMethod('updateExistingSession')
      ->shouldReceive('updateExistingSession')
      ->with(['session_token' => $session] + $updatedData)
      ->andReturn(true);

    $this->assertTrue($service->updateExistingSession(['session_token' => $session] + $updatedData));
  }

  public function test_service_returns_false_when_updating_nonexistent_session()
  {
    $session = null;
    $updatedData = ['key' => 'value'];

    $service = Mockery::mock(OnboardingService::class);
    $service->shouldAllowMockingMethod('updateExistingSession')
      ->shouldReceive('updateExistingSession')
      ->with(['session_token' => $session] + $updatedData)
      ->andReturn(false);

    $this->assertFalse($service->updateExistingSession(['session_token' => $session] + $updatedData));
  }
}