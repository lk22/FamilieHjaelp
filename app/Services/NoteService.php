<?php

namespace App\Services;

use App\Dto\UpdateNoteDto;
use App\Repositories\NoteRepository;

use App\Contracts\NoteServiceContract;

class NoteService implements NoteServiceContract {

  public function __construct(private NoteRepository $noteRepository) {}

  public function updateNote(UpdateNoteDto $note): bool {
    return $this->noteRepository->update($note);
  }

  public function deleteNote(int $noteId): bool {
    return $this->noteRepository->delete($noteId);
  }
}