<?php

namespace App\Contracts;

use App\Dto\UpdateNoteDto;

interface NoteRepositoryContract {
  public function update(UpdateNoteDto $note): bool;
  public function delete(int $noteId): bool;
}