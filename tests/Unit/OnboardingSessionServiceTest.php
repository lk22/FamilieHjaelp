<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\TestCase;
use App\Services\OnboardingService;
use App\Models\OnboardingSession;
use Mockery;

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

    $service = Mockery::mock(OnboardingService::class);

    // this should create a new onboarding session if one does not exist
    $service->shouldAllowMockingMethod('findOrCreateSession');
    $service->shouldReceive('findOrCreateSession')
      ->with(null, null, null)
      ->andReturn(OnboardingSession::create());

    $this->assertInstanceOf(OnboardingSession::class, $service->findOrCreateSession(null, null, null));
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

  public function test_service_does_not_submit_step_if_session_is_invalid()
  {
    $session = "null";
    $step = 'some_step';

    // this expect an Illuminate\Http\Request to be passed to the submitStep method
    $request = Mockery::mock(\Illuminate\Http\Request::class);
    $request->shouldReceive('input')
      ->with('data')
      ->andReturn(['session_token' => $session]);
    $request->shouldReceive('input')
      ->with('nextStep')
      ->andReturn('next_step');

    $service = new OnboardingService(new \App\Repositories\OnboardingSessionRepository());
    $submitted = $service->submitStep(['session_token' => $session], "next_step", "scenario", $step);

    $this->assertFalse($submitted);
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