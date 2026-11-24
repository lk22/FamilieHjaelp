<?php

namespace App\Dto;

class CreateNoteDto {
  public function __construct(
    public string $title,
    public string $note_content,
    public string $created_at,
    public string $updated_at,
    public string $locale,
    public string $type = 'note',
    public bool $is_important = false,
    public bool $is_archived = false,
  ) {}
}