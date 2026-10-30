<?php

namespace App\Repositories;

use App\Models\OnboardingSession;
use Illuminate\Support\Str;
use App\Contracts\OnboardingSessionRepositoryContract;

class OnboardingSessionRepository implements OnboardingSessionRepositoryContract {
  /**
   * Find an existing onboarding session by its token or create a new one if it doesn't exist.
   *
   * @param string $token
   * @param int|null $userId
   * @param string|null $locale
   * @return OnboardingSession
   */
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

  /**
   * Find an onboarding session by its token.
   *
   * @param string|null $token
   * @return OnboardingSession|null
   */
  public function findBySessionToken(?string $token = null): ?OnboardingSession {
      return OnboardingSession::where('session_token', $token)->first() ?? null;
  }

  /**
   * Update an existing onboarding session with new data.
   *
   * @param OnboardingSession $session
   * @param array $data
   * @return bool
   */
  public function updateSession(OnboardingSession $session, array $data): bool {
      if (! $session->exists ) {
          return false;
      }

      return $session->update($data);
  }

  /** er
   * Create a new onboarding session.
   *
   * @param string|null $locale
   * @return OnboardingSession
   */
  public function createSession(?string $locale = null): OnboardingSession {
      return OnboardingSession::create([
        'session_token' => Str::uuid()->toString(),
        'user_id' => null,
        'completed' => false,
        'steps_data' => [],
        'form_data' => [],
        'current_step' => 'welcome',
        'next_step' => null,
        'locale' => $locale
      ]);
  }

  /**
   * Mark an onboarding session as complete.
   *
   * @param OnboardingSession $session
   * @return bool
   */
  public function markSessionAsComplete(OnboardingSession $session): bool {
    if ( ! $session->exists() ) {
      return false;
    }

    $session->markAsCompleted();
    return true;
  }

  /**
   * Check if an onboarding session is active (not completed).
   *
   * @param string $sessionToken
   * @return bool
   */
  public function isActiveSession(string $sessionToken): bool {
    $session = $this->findBySessionToken($sessionToken);
    return $session !== null && ! $session->completed;
  }
}