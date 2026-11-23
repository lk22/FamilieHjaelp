<?php

namespace App\Repositories;

use App\Dto\UpdateNoteDto;

use App\Contracts\NoteRepositoryContract;

use App\Models\Note;

use Illuminate\Support\Str;

class NoteRepository implements NoteRepositoryContract
{
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
}
