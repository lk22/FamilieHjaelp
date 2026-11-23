<?php

namespace App\Repositories;

use App\Dto\UpdateNoteDto;

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
    return true;
  }

  public function archive(int $noteId): bool {
    // Use Eloquent to soft delete via is_archived flag
    return Note::where('id', $noteId)->update(['is_archived' => true]);
  }
}
