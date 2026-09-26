<?php

namespace Tests\Feature\Onboarding;

use App\Models\OnboardingSession;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FamilyOnboardingTest extends TestCase
{
    use RefreshDatabase;

    public function test_getting_started_creates_onboarding_session(): void
    {
        $response = $this->get(route('app.getting-started'));

        $response->assertOk();
        $response->assertCookie('onboarding_session_token');
        $this->assertDatabaseCount('onboarding_sessions', 1);
    }

    public function test_family_step_submission_is_saved_in_onboarding_session(): void
    {
        $session = OnboardingSession::factory()->create([
            'scenario' => null,
            'current_step' => 'welcome',
            'next_step' => null,
            'steps_data' => [],
        ]);

        $response = $this->withCookie('onboarding_session_token', $session->session_token)->post(
            route('onboarding.scenario.step.submit', [
                'scenario' => 'family',
                'step' => 'one',
                'nextStep' => 'two',
            ]),
            [
                'data' => [
                    'familyName' => 'Andersen',
                ],
            ]
        );

        $response->assertRedirect(route('onboarding.scenario.step', [
            'scenario' => 'family',
            'step' => 'two',
        ]));

        $session->refresh();

        $this->assertSame('family', $session->scenario);
        $this->assertSame('one', $session->current_step);
        $this->assertSame('two', $session->next_step);
        $this->assertSame('Andersen', $session->steps_data['one']['familyName']);
    }

    public function test_family_kids_step_requires_at_least_one_kid(): void
    {
        $session = OnboardingSession::factory()->create();

        $response = $this->from(route('onboarding.scenario.step', ['scenario' => 'family', 'step' => 'three']))
            ->withCookie('onboarding_session_token', $session->session_token)
            ->post(route('onboarding.scenario.step.submit', [
                'scenario' => 'family',
                'step' => 'three',
                'nextStep' => 'complete',
            ]), [
                'data' => [
                    'kids' => [],
                ],
            ]);

        $response->assertRedirect(route('onboarding.scenario.step', ['scenario' => 'family', 'step' => 'three']));
        $response->assertSessionHasErrors(['data.kids']);
    }

    public function test_completing_onboarding_marks_session_as_completed(): void
    {
        $session = OnboardingSession::factory()->create([
            'completed' => false,
            'current_step' => 'three',
        ]);

        $response = $this->post(route('onboarding.completed'), [
            'data' => [
                'session_token' => $session->session_token,
            ],
        ]);

        $response->assertRedirect(route('onboarding.completed.view'));

        $session->refresh();

        $this->assertTrue($session->completed);
        $this->assertSame('completed', $session->current_step);
        $this->assertNotNull($session->completed_at);
    }

    public function test_completing_onboarding_requires_session_token(): void
    {
        $response = $this->from(route('app.getting-started'))->post(route('onboarding.completed'), [
            'data' => [],
        ]);

        $response->assertRedirect(route('app.getting-started'));
        $response->assertSessionHasErrors(['data.session_token']);
    }

    public function test_completing_onboarding_with_invalid_token_returns_not_found(): void
    {
        OnboardingSession::factory()->create();

        $response = $this->post(route('onboarding.completed'), [
            'data' => [
                'session_token' => 'invalid-token',
            ],
        ]);

        $response->assertNotFound();
    }
}
