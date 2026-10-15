<?php

namespace App\Contracts;

interface OnboardingSessionRepositoryContract {
  public function findOrCreateSession(string $token, ?int $userId = null, ?string $locale= null): \App\Models\OnboardingSession;
  public function findBySessionToken(string $token): ?\App\Models\OnboardingSession;
  public function updateSession(\App\Models\OnboardingSession $session, array $data): bool;
  public function createSession(): \App\Models\OnboardingSession;
  public function markSessionAsComplete(\App\Models\OnboardingSession $session): bool;
  public function isActiveSession(string $sessionToken): bool;
}