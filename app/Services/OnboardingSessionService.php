<?php
namespace App\Services;

use App\Models\OnboardingSession;
use Illuminate\Support\Str;

class OnboardingSessionService {
    /**
     * Find or create an onboarding session for a given user and session token.
     *
     * @param int|null $userId The ID of the user (nullable for guest users).
     * @param string|null $sessionToken The session token from cookie or session (nullable).
     * @return OnboardingSession The found or newly created onboarding session.
     */
    public function findOrCreateSession(?int $userId, ?string $sessionToken): OnboardingSession
    {
        $session = OnboardingSession::where('session_token', $sessionToken)->first();

        if ($session) {
            return $session;
        }

        return OnboardingSession::create([
            'user_id' => $userId,
            'session_token' => $sessionToken ?? $this->generateToken(),
            'completed' => false,
            'steps_data' => [],
            'form_data' => [],
            'current_step' => 'welcome',
            'next_step' => null,
        ]);
    }

    /**
     * Finding onboarding session by saved token
     *
     * @param mixed $sessionToken
     * @return object|OnboardingSession|null
     */
    public function findByToken(?string $sessionToken): ?OnboardingSession
    {
        if (!$sessionToken) {
          return null;
        }

        return OnboardingSession::where('session_token', $sessionToken)->first();
    }


    /**
     * Update session with newest session data
     *
     * @param OnboardingSession $session
     * @param array $data
     * @return OnboardingSession
     */
    public function updateSession(OnboardingSession $session, array $data): OnboardingSession
    {
        $session->update($data);
        return $session;
    }

    /**
     * Linking session to specific user
     *
     * @param OnboardingSession $session
     * @param int $userId
     * @return OnboardingSession
     */
    public function linkSessionToUser(OnboardingSession $session, int $userId): OnboardingSession
    {
        $session->update(['user_id' => $userId]);
        return $session;
    }

    /**
     * Marking session as completed
     *
     * @param OnboardingSession $session
     * @return OnboardingSession
     */
    public function markSessionAsCompleted(OnboardingSession $session): OnboardingSession
    {
        $session->update(['completed' => true]);
        return $session;
    }

    public function generateToken(): string
    {
      return Str::uuid()->toString();
    }

    /**
     * Deleting existing session if it exists
     *
     * @param OnboardingSession $session
     * @return void
     */
    public function deleteSession(OnboardingSession $session): void
    {
        $existingSession = OnboardingSession::find($session->id);
        if ($existingSession) {
            $existingSession->delete();
        }
    }
}