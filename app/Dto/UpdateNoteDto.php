<?php

namespace App\Dto;

class UpdateNoteDto
{
  public function __construct(
    public int $id,
    public string $title,
    public string $slug,
    public string $note_content,
    public string $updated_at,
    public string $created_at,
  ) {}
}