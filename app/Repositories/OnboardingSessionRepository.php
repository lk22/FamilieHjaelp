<?php

namespace App\Repositories;

use App\Models\OnboardingSession;
use Illuminate\Support\Str;
use App\Contracts\OnboardingSessionRepositoryContract;

class OnboardingSessionRepository implements OnboardingSessionRepositoryContract {
  public function findOrCreateSession(string $token, ?int $userId = null, ?string $locale= null): OnboardingSession {
      $session = $this->findBySessionToken($token);

      if ( $session ) {
        return $session;
      }

      $newToken = Str::uuid()->toString();

      return OnboardingSession::create([
        'session_token' => $newToken,
        'user_id' => $userId ?: null,
        'completed' => false,
        'steps_data' => [],
        'form_data' => [],
        "current_step" => 'welcome',
        "next_step" => null,
        "locale" => $locale
      ]);
  }

  public function findBySessionToken(string $token): ?OnboardingSession {
      return OnboardingSession::where('session_token', $token)->first();
  }

  public function updateSession(OnboardingSession $session, array $data): bool {
      if (! $session->exists() ) {
          return false;
      }

      return $session->update($data);
  }

  public function createSession(): OnboardingSession {
      return OnboardingSession::create([]);
  }

  public function markSessionAsComplete(OnboardingSession $session): bool {
    if ( ! $session->exists() ) {
      return false;
    }

    $session->markAsCompleted();
    return true;
  }

  public function isActiveSession(string $sessionToken): bool {
    $session = $this->findBySessionToken($sessionToken);
    return $session !== null && ! $session->isCompleted();
  }
}