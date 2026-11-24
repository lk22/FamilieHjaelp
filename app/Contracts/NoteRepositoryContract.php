<?php

namespace App\Contracts;

use App\Dto\UpdateNoteDto;
use App\Dto\CreateNoteDto;
use App\Models\Note;

interface NoteRepositoryContract {
  public function store(CreateNoteDto $note): bool;
  public function find(int $noteId): ?Note;
  public function update(UpdateNoteDto $note): bool;
  public function delete(int $noteId): bool;
  public function archive(int $noteId): bool;
}