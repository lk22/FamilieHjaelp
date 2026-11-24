<?php

namespace App\Repositories;

use App\Dto\UpdateNoteDto;
use App\Dto\CreateNoteDto;

use App\Contracts\NoteRepositoryContract;

use App\Models\Note;

use Illuminate\Support\Str;

class NoteRepository implements NoteRepositoryContract
{
  public function find(int $noteId): ?Note {
    if ($noteId <= 0) {
      return null;
    }
    return Note::find($noteId);
  }

  public function store(CreateNoteDto $note): bool {
    $created = Note::create([
      "family_id" => auth()->user()->family()->family_id,
      "family_member_id" => auth()->user()->familyMember()->family_member_id,
      "title" => $note->title,
      "slug" => Str::slug($note->title),
      "note_content" => $note->note_content,
      "created_at" => $note->created_at,
      "updated_at" => $note->updated_at,
      "is_important" => $note->is_important ?? false,
      "locale" => $note->locale,
      "type" => $note->type
    ]);

    return $created !== null;
  }

  public function update(UpdateNoteDto $note): bool {
    $noteModel = Note::find($note->id);

    if ( ! $noteModel ) {
      return false;
    }

    $noteModel->update([
      "title" => $note->title,
      "slug" => Str::slug($note->title),
      "note_content" => $note->note_content,
      "updated_at" => now(),
    ]);

    return true;
  }

  public function delete(int $noteId): bool {
    // Get note first to check if it exists
    $note = Note::find($noteId);

    // Return false if note doesn't exist
    return $note !== null && $note->delete();
  }

  public function archive(int $noteId): bool {
    // Get note first to check if it exists
    $note = Note::find($noteId);

    // Return false if note doesn't exist
    return $note !== null && Note::where('id', $noteId)->update(['is_archived' => true]);
  }
}
