<?php

namespace App\Contracts;

use App\Dto\UpdateNoteDto;

interface NoteServiceContract {
  public function updateNote(UpdateNoteDto $note): bool;
  public function deleteNote(int $noteId): bool;
  public function archiveNote(int $noteId): bool;
}