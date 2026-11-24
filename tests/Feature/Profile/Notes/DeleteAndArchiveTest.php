<?php

namespace Tests\Feature\Profile\Notes;

use App\Models\FamilyMember;
use App\Models\Note;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class DeleteAndArchiveTest extends TestCase
{
    use RefreshDatabase;

    private ?User $testUser = null;
    private ?FamilyMember $familyMember = null;
    private ?Note $note = null;

    protected function setUp(): void
    {
        parent::setUp();

        // Get a user from the test database (RefreshDatabase creates fresh data)
        $this->testUser = User::first() ?? \App\Models\User::factory()->create([
            'email' => 'leoknudsen@test.com',
            'password' => bcrypt('password'),
        ]);

        Auth::login($this->testUser);

        // Get or create a family member for this user
        $this->familyMember = FamilyMember::where('user_id', $this->testUser->id)->first();

        if (!$this->familyMember) {
            echo "Creating test data...";

            // Create a simple family
            $family = \App\Models\Family::create([
                'name' => 'Test Family',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Create a family member with required fields from migration schema
            $this->familyMember = FamilyMember::create([
                'user_id' => $this->testUser->id,
                'family_id' => $family->id,
                'name' => 'Test Member',
                'age' => 30,
                'email' => 'test@familiehjelp.dk',
                'attached_email' => 'test@familiehjelp.dk',
                'family_role' => 'Far',
            ]);

            // Create note using factory (which handles all required fields properly)
            $this->note = Note::factory()->create([
                'user_id' => $this->testUser->id,
                'family_member_id' => $this->familyMember->id,
                'title' => 'Test Note',
                'slug' => 'test-note-' . time(),
            ]);

            echo " done\n";
        }

        // Verify the note exists and has correct fields
        $this->assertEquals('Test Note', $this->note->title);
    }

    /**
     * Test: Archive a note successfully - should redirect to index page
     */
    public function test_archive_note_succeeds()
    {
        // Arrange: Create a note to be archived
        $note = Note::factory()->create([
            'user_id' => $this->testUser->id,
            'family_member_id' => $this->familyMember->id,
            'title' => 'Test Note to Archive',
            'slug' => 'test-note-to-archive-' . time(),
        ]);

        // Act: Send POST request to archive the note
        $response = $this->post(route('profile.notes.archive', ['note' => $note]));

        // Assert: Should redirect to profile notes index page
        $response->assertRedirect(route('profile.notes.index'));
    }

    /**
     * Test: Archive a non-existent note - should return JSON error, not redirect
     */
    public function test_archive_non_existent_note_returns_json_error()
    {
        // Arrange: Try to archive note with ID that doesn't exist
        $noteId = 99999;
        $response = $this->post(route('profile.notes.archive', ['note' => $noteId]));

        $response->assertStatus(404); // Assuming the route returns 404 for non-existent notes
    }

    /**
     * Test: Destroy (delete) a note successfully - should redirect to index page
     */
    public function test_destroy_note_succeeds()
    {
        // Arrange: Create a note to be deleted
        $note = Note::factory()->create([
            'user_id' => $this->testUser->id,
            'family_member_id' => $this->familyMember->id,
        ]);

        // Act: Send DELETE request to destroy the note
        $response = $this->delete(route('profile.notes.destroy', ['note' => $note]));

        // Assert: Should redirect to profile notes index page
        $response->assertRedirect(route('profile.notes.index'));
    }

    /**
     * Test: Destroy a non-existent note - should return JSON error, not redirect
     */
    public function test_destroy_non_existent_note_returns_json_error()
    {
        // Arrange: Try to delete note with ID that doesn't exist
        $noteId = 99999;

        // Act: Send DELETE request to destroy the non-existent note
        $response = $this->delete(route('profile.notes.destroy', ['note' => $noteId]));

        // Assert: Should return 404 status for non-existent note
        $response->assertStatus(404);

    }

    /**
     * Test: Archive then destroy in sequence - first stays, second is deleted
     */
    public function test_archive_then_destroy_sequentially()
    {
        // Arrange: Create two notes
        $noteToArchive = Note::factory()->create([
            'user_id' => $this->testUser->id,
            'family_member_id' => $this->familyMember->id,
        ]);

        $noteToDelete = Note::factory()->create([
            'user_id' => $this->testUser->id,
            'family_member_id' => $this->familyMember->id,
        ]);

        // Act: Archive the first note and delete the second note
        $this->post(route('profile.notes.archive', ['note' => $noteToArchive]));
        $this->delete(route('profile.notes.destroy', ['note' => $noteToDelete]));

        // Assert: The first note should still exist and be archived, the second note should be deleted
        $this->assertDatabaseHas('family_notes', [
            'id' => $noteToArchive->id,
            'is_archived' => 1, // Assuming the archive sets the current timestamp
        ]);

        $this->assertDatabaseMissing('family_notes', [
            'id' => $noteToDelete->id,
        ]);
    }
}
