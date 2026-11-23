<?php

namespace Tests\Feature\Profile\Notes;

use App\Models\FamilyMember;
use App\Models\User;
use App\Models\Note;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class DeleteAndArchiveTest extends TestCase
{
    use RefreshDatabase;

    private FamilyMember $familyMember;
    private Note $note;
    private User $testUser;

    /**
     * Setup: Get a family member and note from existing test data
     */
    protected function setUp(): void
    {
        parent::setUp();

        // RefreshDatabase creates new users, use one that exists in database
        $user = User::first();

        if (!$user || !$user->family_members || !$user->familyMembers->isNotEmpty()) {
            echo "Warning: No existing user/family member found - creating test data\n";
            
            // Create test user and family member with all required fields
            $this->testUser = User::factory()->create([
                'email' => 'leoknudsen@test.com',
                'password' => bcrypt('password'),
                'name' => 'Leo Knudsen',
                'has_completed_onboarding' => true,
            ]);
            
            Auth::login($this->testUser);

            // Get family from user or create
            $family = Family::first();
            if (!$family) {
                $family = \App\Models\Family::factory()->create(['name' => 'Test Family']);
            }

            // Create family member for this user
            $this->familyMember = FamilyMember::create([
                'user_id' => $this->testUser->id,
                'family_id' => $family->id,
                'name' => $this->testUser->name,
                'age' => 30,
                'email' => $this->testUser->email,
                'family_role' => 'Far',
            ]);
        } else {
            Auth::login($user);
            $this->familyMember = FamilyMember::where('user_id', $user->id)->first();
        }

        // Get an existing note for this user/family_member or create one if needed
        $this->note = Note::where('user_id', $user->id || $this->testUser->id)
            ->where('family_member_id', $this->familyMember->id)
            ->first();

        // If no existing note found, create a simple one without is_archived
        if (!$this->note) {
            $this->note = Note::create([
                'user_id' => $this->testUser->id,
                'family_member_id' => $this->familyMember->id,
                'is_important' => false,
                'title' => 'Test Note',
                'slug' => 'test-note',
                'note_content' => 'This is a test note for deleting and archiving.',
                'locale' => 'da',
                'type' => 'general',
            ]);

        // Verify the note was created with proper fields (no is_archived column in existing DB)
        $this->assertEquals('Test Note', $this->note->title);
    }

    /**
     * Feature Test: Archive a note successfully
     */
    public function test_archive_note_succeeds()
    public function test_archive_note_succeeds()
    {
        // Arrange
        $response = $this->post(route('profile.notes.archive', ['note' => $this->note]));

        // Assert - HTTP status code should be redirect (not JSON error)
        $this->assertRedirectsToRoute('profile.notes.index');

        // Verify the note was archived in the database (before soft deletes, just set flag)
        $archivedNote = Note::find($this->note->id);
        $this->assertTrue(true, 'Note record should still exist with is_archived=true');

        // Get a new note object to check the is_archived status
        $retrievedNote = Note::findOrFail($this->note->id);
        $this->assertEquals(true, $retrievedNote->is_archived);
    }

    /**
     * Feature Test: Archive a non-existent note returns error (not redirect)
     */
    public function test_archive_non_existent_note_returns_json_error()
    {
        // Arrange
        $noteId = 99999;
        $response = $this->post(route('profile.notes.archive', ['note' => $noteId]));

        // Assert - Should return JSON error, not redirect
        $this->assertEquals(200, $response->status());
        $data = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('error', $data);
        $this->assertEquals('Failed to archive note', $data['error']);
    }

    /**
     * Feature Test: Destroy (delete) a note successfully
     */
    public function test_destroy_note_succeeds()
    {
        // Arrange
        $response = $this->delete(route('profile.notes.destroy', ['note' => $this->note]));

        // Assert - HTTP status code should be redirect
        $this->assertRedirectsToRoute('profile.notes.index');

        // Verify the note was deleted from the database
        $deletedNote = Note::find($this->note->id);
        $this->assertNull($deletedNote, 'Note record should not exist after delete');
    }

    /**
     * Feature Test: Destroy a non-existent note returns error (not redirect)
     */
    public function test_destroy_non_existent_note_returns_json_error()
    {
        // Arrange
        $noteId = 99999;
        $response = $this->delete(route('profile.notes.destroy', ['note' => $noteId]));

        // Assert - Should return JSON error, not redirect
        $this->assertEquals(200, $response->status());
        $data = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('error', $data);
        $this->assertEquals('Failed to delete note', $data['error']);
    }

    /**
     * Feature Test: Can still query for unarchived notes only after archiving
     */
    public function test_can_query_non_archived_notes_only()
    {
        // Create another note and mark it as NOT archived
        Note::create([
            'user_id' => $this->testUser->id,
            'family_member_id' => $this->familyMember->id,
            'is_important' => false,
            'title' => 'Unarchived Note',
            'slug' => 'unarchived-note',
            'note_content' => 'This note is NOT archived.',
            'locale' => 'da',
            'type' => 'general',
            'is_archived' => false, // Explicitly set as not archived
        ]);

        // Get all notes (should include both archived and unarchived)
        $allNotes = Note::where('user_id', $this->testUser->id)->get();
        $this->assertCount(2, $allNotes);

        // The note we created earlier should be marked as archived
        $originalNote = Note::find($this->note->id);
        $this->assertTrue($originalNote->is_archived);

        // The note we just added should not be archived
        $unarchivedNote = Note::where('slug', 'unarchived-note')->first();
        $this->assertFalse($unarchivedNote->is_archived);
    }

    /**
     * Feature Test: Archive and delete can be used in sequence
     */
    public function test_archive_then_destroy_sequentially()
    {
        // Arrange - Create two notes
        $firstNote = Note::create([
            'user_id' => $this->testUser->id,
            'family_member_id' => $this->familyMember->id,
            'is_important' => false,
            'title' => 'First Note',
            'slug' => 'first-note',
            'note_content' => 'First note.',
            'locale' => 'da',
            'type' => 'general',
            'is_archived' => false,
        ]);

        $secondNote = Note::create([
            'user_id' => $this->testUser->id,
            'family_member_id' => $this->familyMember->id,
            'is_important' => true,
            'title' => 'Second Note',
            'slug' => 'second-note',
            'note_content' => 'Second note.',
            'locale' => 'da',
            'type' => 'general',
            'is_archived' => false,
        ]);

        // Act - Archive first note, destroy second note
        $archiveResponse = $this->post(route('profile.notes.archive', ['note' => $firstNote]));
        $destroyResponse = $this->delete(route('profile.notes.destroy', ['note' => $secondNote]));

        // Assert - Both should redirect (success)
        $this->assertRedirectsToRoute('profile.notes.index', $archiveResponse);
        $this->assertRedirectsToRoute('profile.notes.index', $destroyResponse);

        // Verify state after operations
        $firstNoteRecord = Note::find($firstNote->id);
        $secondNoteRecord = Note::find($secondNote->id);

        // First note should still exist but be archived
        $this->assertNotNull($firstNoteRecord, 'First note record should exist');
        $this->assertTrue($firstNoteRecord->is_archived, 'First note should be archived');

        // Second note should be deleted entirely
        $this->assertNull($secondNoteRecord, 'Second note record should be deleted');
    }
}
