<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\OnboardingSession;
use App\Models\User;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get('/app/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register()
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('app.getting-started', absolute: false));
    }

    public function test_can_register_with_onboarding_completed_true_url_parameter()
    {
        $token = fake()->uuid();
        $onboardingSession = OnboardingSession::factory()->create([
            'session_token' => $token,
            'completed' => true
        ]);

        $response = $this->withCookie('onboarding_session_token', $token)->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'onboarding_completed' => true
        ]);

        $user = User::where('email', 'test@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals($user->has_completed_onboarding, 1);
        $this->assertAuthenticated();

        $onboardingSession->refresh();
        $this->assertEquals($user->id, $onboardingSession->user_id);

        $response->assertRedirect(route('app.getting-started', absolute: false));
    }
}
