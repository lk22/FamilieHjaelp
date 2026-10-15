<?php

namespace App\Dto;

class ChildDto {
  public function __construct(
    public string $firstName,
    public string $middleName,
    public string $lastName,
    public int $ageYear,
    public int $ageMonth,
    public int $ageWeeks,
    public ?bool $needsUser,
    public ?string $childEmail
  ){
    $this->firstName = $firstName;
    $this->middleName = $middleName;
    $this->lastName = $lastName;
    $this->ageYear = $ageYear;
    $this->ageMonth = $ageMonth;
    $this->ageWeeks = $ageWeeks;
    $this->needsUser = $needsUser;
    $this->childEmail = $childEmail;
  }
}