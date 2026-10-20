<?php

namespace App\Dto;

class ChildDto {
  public function __construct(
    public string $firstName,
    public string $middleName,
    public string $lastName,
    public string $ageYears,
    public ?int $ageMonths,
    public ?int $ageWeeks,
    public ?bool $needsUserAccess,
    public ?string $childEmail
  ){
    $this->firstName = $firstName;
    $this->middleName = $middleName;
    $this->lastName = $lastName;
    $this->ageYears = $ageYears;
    $this->ageMonths = $ageMonths;
    $this->ageWeeks = $ageWeeks;
    $this->needsUserAccess = $needsUserAccess;
    $this->childEmail = $childEmail;
  }
}