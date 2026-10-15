<?php

namespace App\Dto;

class ParentDto {
  public function __construct(
    public int $familyId,
    public string $firstName,
    public string $middleName,
    public string $lastName,
    public string $age,
    public string $familyRole,
    public bool $needsUser,
    public string $parentEmail,
    public ?bool $hasPartner,
  ) {
    $this->familyId = $familyId;
    $this->firstName = $firstName;
    $this->middleName = $middleName;
    $this->lastName = $lastName;
    $this->age = $age;
    $this->familyRole = $familyRole;
    $this->needsUser = $needsUser;
    $this->parentEmail = $parentEmail;
    $this->hasPartner = $hasPartner;
  }
}