<?php

namespace App\Services;

use App\Contracts\OnboardingServiceContract;
use Illuminate\Http\Request;

use App\Repositories\OnboardingSessionRepository;
use App\Models\OnboardingSession;

use App\Exceptions\OnboardingStepException;

class OnboardingService implements OnboardingServiceContract {

    public function __construct(
      private OnboardingSessionRepository $onboardingSessionRepository
    ){}

    /**
     * Finding existing session or creating a new one if existing session not exists
     *
     * @param mixed $userId
     * @param string|null $token
     * @param mixed $locale
     * @return ?OnboardingSession
     */
    public function findOrCreateSession(?int $userId, ?string $token, ?string $locale = null): ?OnboardingSession {
      $existingSession = $this->onboardingSessionRepository->findBySessionToken($token);

      if ($existingSession) {
          return $existingSession;
      }

      $newSession = $this->onboardingSessionRepository->createSession($locale);

      // $newSession = $this->onboardingSessionRepository->findOrCreateSession($token, $userId, $locale);
      return $newSession;
    }

    /**
     * Submitting given step from the onboarding flow
     *
     * @param array $stepData
     * @param string $nextStep
     * @param string $scenario
     * @param string $step
     * @throws OnboardingStepException
     * @return bool
     */
    public function submitStep(array $stepData, string $nextStep, string $scenario, string $step): bool {
      $existingSession = $this->onboardingSessionRepository->findBySessionToken($stepData['sessionToken']);

      if ( ! $existingSession) {
        throw new OnboardingStepException('Onboarding session not found.');
      }

      $updatedSession = $this->onboardingSessionRepository->updateSession($existingSession, [
        'scenario' => $scenario,
        'current_step' => $step,
        'steps_data' => array_merge($existingSession->steps_data, [$step => $stepData]),
        'next_step' => $nextStep
      ]);

      if ( ! $updatedSession ) {
        throw new OnboardingStepException('Failed to update onboarding session.');
      }

      if ($step === "complete") {
        $this->onboardingSessionRepository->markSessionAsComplete($existingSession);
      }

      return true;
    }

    /**
     * Verifying onboarding session token - making sure the onboarding session can be fetched from the database to make sure it can be continued or in sync later on in the process
     *
     * @param string $token
     * @return bool
     */
    public function verifyOnboardingSessionToken(string $token): bool {
        $session = $this->onboardingSessionRepository->findBySessionToken($token);

        return $session !== null;
    }

    /**
     * Find specific session token in the onboarding session repository
     *
     * @param string $token
     * @return OnboardingSession|null
     */
    public function findBySessionToken(string $token): ?OnboardingSession {
        return $this->onboardingSessionRepository->findBySessionToken($token);
    }

    /**
     * Update existing session in the repository
     *
     * @param array $sessionData
     * @return bool
     */
    public function updateExistingSession(array $sessionData): bool {
        return $this->onboardingSessionRepository->updateSession($this->findBySessionToken($sessionData['sessionToken']), $sessionData) ?? false;
    }

    /**
     * Marking a session as completed
     *
     * @param OnboardingSession $onboardingSession
     * @throws OnboardingStepException
     * @return bool
     */
    public function markSessionAsComplete(OnboardingSession $onboardingSession): bool {
        if ( ! $onboardingSession->exists() || is_null($onboardingSession) ) {
          throw new OnboardingStepException('Onboarding session cannot be null.');
        }

        if ( ! $onboardingSession->markAsCompleted() ) {
          return false;
        }

        return true;
    }

    public function updateOnboardingStatus(string $status, string $sessionToken): bool {
        // Implement the logic to update onboarding status here
        return true;
    }

    public function completeOnboarding(string $token): bool {
        // Implement the logic to complete onboarding here
        return true;
    }

    public function checkActiveSession(string $session): bool {
      return $this->onboardingSessionRepository->isActiveSession($session);
    }
}