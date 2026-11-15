<?php

namespace App\Dto;

class FamilyDto {
  public function __construct(
    public string $familyName,
    public int $familySize,
    public string $createdAt,
    public string $updatedAt
  ) {}
}