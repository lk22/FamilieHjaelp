<?php

namespace Tests\Feature\Website;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use Illuminate\Foundation\Testing\Attributes\UnitTest;

class WebsiteTest extends TestCase
{
  use RefreshDatabase;

  public function test_home_page_is_accessible()
  {
    $this->get('/')->assertStatus(200);
  }

  public function test_home_page_can_be_accessed_with_locale()
  {
    $this->get('/da')->assertStatus(200);
    $this->get('/en')->assertStatus(200);
  }

  public function test_help_resources_page_is_accessible()
  {
    $this->get('/da/hjaelpemidler')->assertStatus(200);
    $this->get('/en/hjaelpemidler')->assertStatus(200);
  }

  public function test_our_mission_page_is_accessible()
  {
    $this->get('/da/vores-mission')->assertStatus(200);
    $this->get('/en/vores-mission')->assertStatus(200);
  }

  public function test_user_experiences_pages_are_accessible()
  {
    $this->get('/da/har-du-oplevet/abort')->assertStatus(200);
    $this->get('/en/har-du-oplevet/abort')->assertStatus(200);

    $this->get('/da/har-du-oplevet/doedfoedsel')->assertStatus(200);
    $this->get('/en/har-du-oplevet/doedfoedsel')->assertStatus(200);

    $this->get('/da/har-du-oplevet/foraeldre')->assertStatus(200);
    $this->get('/en/har-du-oplevet/foraeldre')->assertStatus(200);

    $this->get('/da/har-du-oplevet/mistet-familie-medlem')->assertStatus(200);
    $this->get('/en/har-du-oplevet/mistet-familie-medlem')->assertStatus(200);
  }

  public function test_functions_page_is_accessible()
  {
    $this->get('/da/funktioner')->assertStatus(200);
    $this->get('/en/funktioner')->assertStatus(200);
  }

  public function test_getting_started_page_is_accessible()
  {
    $this->get('/da/kom-igang')->assertStatus(200);
    $this->get('/en/kom-igang')->assertStatus(200);
  }

  public function test_stories_page_is_accessible()
  {
    $this->get('/da/historier')->assertStatus(200);
    $this->get('/en/historier')->assertStatus(200);
  }

  public function test_app_home_page_is_accessible()
  {
    $this->get('/da/app')->assertStatus(200);
    $this->get('/en/app')->assertStatus(200);
  }
}