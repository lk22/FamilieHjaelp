<?php

namespace Tests\Feature\Onboarding;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateFamilyChildrenControllerTest extends TestCase
{
    use RefreshDatabase;

    // Add your test methods here
    public function can_send_create_family_children_request()
    {
      $response = $this->postJson(route('api.onboarding.family.create.children'), [
        'familyId' => 1,
        'children' => [
              [
                'gender' => 'male',
                'firstName' => 'John',
                'middleName' => 'Doe',
                'lastName' => 'Doe',
                'ageYears' => 5,
                'ageMonths' => 0,
                'ageWeeks' => 0,
                'needsUserLogin' => false,
                'userEmail' => 'john.doe@example.com'
              ]
          ]
      ]);

      $response->assertCreated();
    }

    public function test_create_family_children_requires_children_data()
    {
        $response = $this->postJson(route('api.onboarding.family.create.children'), [
            'familyId' => 1,
            'children' => []
        ]);

        $response->assertJson([
          'message' => 'The children field is required.',
          'errors' => [
            'children' => ['The children field is required.']
          ]
        ]);

        $response->assertStatus(422);
    }

    public function test_create_family_children_requires_family_id()
    {
      $response = $this->postJson(route('api.onboarding.family.create.children'), [
          'children' => [
              [
                'gender' => 'male',
                'firstName' => 'John',
                'middleName' => 'Doe',
                'lastName' => 'Doe',
                'ageYears' => 5,
                'ageMonths' => 0,
                'ageWeeks' => 0,
                'needsUserLogin' => false,
                'userEmail' => 'john.doe@example.com'
              ]
          ]
      ]);

      $response->assertJson([
        'message' => 'The family id field is required.',
        'errors' => [
          'familyId' => ['The family id field is required.']
        ]
      ]);
      $response->assertStatus(422);
    }
}