<?php

namespace Tests\Feature\Profile\Notes;

use App\Models\Note;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EditNoteTest extends TestCase
{
    use RefreshDatabase;

    public function test_edit_page_receives_existing_note_values(): void
    {
        $user = User::factory()->create();
        $note = Note::factory()->create(['user_id' => $user->id, 'type' => 'health']);

        $this->actingAs($user)->get(route('profile.notes.edit', $note))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Profile/Notes/Edit')
                ->where('note.title', $note->title)
                ->where('note.slug', $note->slug)
                ->where('note.note_content', $note->note_content)
                ->where('note.type', 'health')
            );
    }

    public function test_update_saves_fields_and_redirects_to_the_new_slug(): void
    {
        $user = User::factory()->create();
        $note = Note::factory()->create(['user_id' => $user->id, 'type' => 'general']);
        $createdAt = $note->created_at;
        $content = '{"blocks":[{"type":"paragraph","data":{"text":"Updated"}}]}';

        $this->actingAs($user)->put(route('profile.notes.update', $note), [
            'title' => 'A Changed Title!',
            'note_content' => $content,
            'type' => 'health',
        ])->assertRedirect(route('profile.notes.show', 'a-changed-title'));

        $note->refresh();
        $this->assertSame('A Changed Title!', $note->title);
        $this->assertSame('a-changed-title', $note->slug);
        $this->assertSame($content, $note->note_content);
        $this->assertSame('health', $note->type);
        $this->assertTrue($createdAt->equalTo($note->created_at));
        $this->actingAs($user)->get(route('profile.notes.show', $note))->assertOk();
    }

    public function test_update_preserves_type_when_omitted_and_validates_fields(): void
    {
        $user = User::factory()->create();
        $note = Note::factory()->create(['user_id' => $user->id, 'type' => 'appointment']);

        $this->actingAs($user)->put(route('profile.notes.update', $note), [
            'title' => 'Updated',
            'note_content' => 'Content',
        ])->assertRedirect(route('profile.notes.show', 'updated'));
        $this->assertSame('appointment', $note->refresh()->type);

        $this->actingAs($user)->put(route('profile.notes.update', $note), [
            'title' => '',
            'note_content' => '',
            'type' => '',
        ])->assertSessionHasErrors(['title', 'note_content', 'type']);
        $this->assertSame('Updated', $note->refresh()->title);
    }
}
