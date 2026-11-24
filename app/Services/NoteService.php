<?php

namespace App\Services;

use App\Dto\UpdateNoteDto;
use App\Dto\CreateNoteDto;
use App\Repositories\NoteRepository;

use App\Contracts\NoteServiceContract;

class NoteService implements NoteServiceContract {

  public function __construct(private NoteRepository $noteRepository) {}

  public function createNote(CreateNoteDto $note): bool {
    return $this->noteRepository->store($note);
  }

  public function updateNote(UpdateNoteDto $note): bool {
    return $this->noteRepository->update($note);
  }

  public function deleteNote(int $noteId): bool {
    // Check if note exists first (enforcing security pattern)
    $note = $this->noteRepository->find($noteId);

    return $note !== null && $this->noteRepository->delete($noteId);
  }

  public function archiveNote(int $noteId): bool {
    // Check if note exists first (enforcing security pattern)
    $note = $this->noteRepository->find($noteId);

    return $note !== null && $this->noteRepository->archive($noteId);
  }
}