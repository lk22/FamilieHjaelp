<?php

namespace App\Contracts;

use App\Dto\UpdateNoteDto;
use App\Dto\CreateNoteDto;

interface NoteServiceContract {
  public function createNote(CreateNoteDto $note): bool;
  public function updateNote(UpdateNoteDto $note): bool;
  public function deleteNote(int $noteId): bool;
  public function archiveNote(int $noteId): bool;
}