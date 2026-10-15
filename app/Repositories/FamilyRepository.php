<?php

namespace App\Repositories;

// Contracts
use App\Contracts\FamilyRepositoryContract;

// Models
use App\Models\Family;
use App\Models\FamilyMember;

// Data objects
use App\Dto\FamilyDto;
use App\Dto\ParentDto;

// Exceptions
use App\Exceptions\FamilyNotCreatedException;
use App\Exceptions\CouldNotCreateFamilyParentsException;

class FamilyRepository implements FamilyRepositoryContract {
  public function createFamily(FamilyDto $data): ?Family
  {
    // check if the family already exists
    $family = Family::where('name', $data->familyName)->first();

    if ($family !== null) {
      return $family;
    }

    $family = Family::create([
      'name' => $data->familyName,
      'family_size' => $data->familySize,
      'created_at' => $data->createdAt,
      'updated_at' => $data->updatedAt,
    ]);

    return $family;
  }

  public function associateFamilyParents(
    int $familyId,
    ParentDto $mainParent,
    ParentDto $partner
  ): void
  {
    try {
      $family = Family::findOrFail($familyId);

      $mainParentFullName = $mainParent->firstName . ' ' . $mainParent->middleName . ' ' . $mainParent->lastName;
      $partnerFullName = $partner->firstName . ' ' . $partner->middleName . ' ' . $partner->lastName;
      $family->members()->createMany([
        [
          'family_id' => $familyId,
          "has_account" => 0,
          "user_id" => 0,
          "name" => $mainParentFullName,
          "family_role" => $mainParent->familyTitle,
          "email" => $mainParent->parentEmail,
          "attached_email" => $mainParent->hasPartner ? $partner->parentEmail : null,
          "age" => $mainParent->age
        ],
        [
          'family_id' => $familyId,
          "has_account" => 0,
          "user_id" => 0,
          "name" => $partnerFullName,
          "family_role" => $partner->familyTitle,
          "email" => $partner->parentEmail,
          "attached_email" => $partner->hasPartner ? $mainParent->parentEmail : null,
          "age" => $partner->age
        ]
      ]);
    } catch (CouldNotCreateFamilyParentsException $e) {
      throw new CouldNotCreateFamilyParentsException("Could not create family parents for family ID: $familyId");
    }
  }
}