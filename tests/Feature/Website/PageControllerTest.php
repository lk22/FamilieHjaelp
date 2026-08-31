<?php

namespace Tests\Feature\Website;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageControllerTest extends TestCase
{
  use RefreshDatabase;

  public function test_home_page_is_accessible()
  {
    $this->get(route('home'))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('index')
    );
  }

  public function test_home_page_can_be_accessed_with_locale()
  {
    $this->get(route('home', ['locale' => 'da']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('index')
    );
    $this->get(route('home', ['locale' => 'en']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('index')
    );
  }

  public function test_our_mission_page_is_accessible()
  {
    $this->get(route('page.our-mission', ['locale' => 'da']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('our-mission')
    );
    $this->get(route('page.our-mission', ['locale' => 'en']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('our-mission')
    );
  }

  public function test_functions_page_is_accessible()
  {
    $this->get(route('page.functions', ['locale' => 'da']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions')
    );
    $this->get(route('page.functions', ['locale' => 'en']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions')
    );
  }

  public function test_stories_page_is_accessible()
  {
    $this->get(route('page.stories', ['locale' => 'da']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('stories')
    );
    $this->get(route('page.stories', ['locale' => 'en']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('stories')
    );
  }

  public function test_getting_started_page_is_accessible()
  {
    $this->get(route('page.getting-started', ['locale' => 'da']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('getting-started')
    );
    $this->get(route('page.getting-started', ['locale' => 'en']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('getting-started')
    );
  }

  public function test_calendar_function_page_is_accessible()
  {
    $this->get(route('page.functions.calendar', ['locale' => 'da']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions/calendar')
    );
    $this->get(route('page.functions.calendar', ['locale' => 'en']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions/calendar')
    );
  }

  public function test_tasks_function_page_is_accessible()
  {
    $this->get(route('page.functions.tasks', ['locale' => 'da']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions/tasks')
    );
    $this->get(route('page.functions.tasks', ['locale' => 'en']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions/tasks')
    );
  }

  public function test_notes_function_page_is_accessible()
  {
    $this->get(route('page.functions.notes', ['locale' => 'da']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions/notes')
    );
    $this->get(route('page.functions.notes', ['locale' => 'en']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions/notes')
    );
  }

  public function test_milestones_function_page_is_accessible()
  {
    $this->get(route('page.functions.milestones', ['locale' => 'da']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions/milestones')
    );
    $this->get(route('page.functions.milestones', ['locale' => 'en']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions/milestones')
    );
  }

  public function test_health_function_page_is_accessible()
  {
    $this->get(route('page.functions.health', ['locale' => 'da']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions/health')
    );
    $this->get(route('page.functions.health', ['locale' => 'en']))->assertStatus(200)->assertInertia(fn($page) => $page
      ->component('functions/health')
    );
  }
}