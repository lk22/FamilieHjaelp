<?php

namespace App\Contracts;

use App\Models\OnboardingSession;

interface OnboardingServiceContract
{
  public function findOrCreateSession(?int $userId, ?string $token, ?string $locale = null): ?OnboardingSession;
  public function submitStep(array $stepData, string $nextStep, string $scenario, string $step): bool;

  public function verifyOnboardingSessionToken(string $token): bool;
  public function findBySessionToken(string $token): ?OnboardingSession;
  public function updateOnboardingStatus(string $status, string $sessionToken): bool;
  public function completeOnboarding(string $token): bool;

  public function markSessionAsComplete(OnboardingSession $onboardingSession): bool;

  public function updateExistingSession(
    array $sessionData
  ): bool;
}