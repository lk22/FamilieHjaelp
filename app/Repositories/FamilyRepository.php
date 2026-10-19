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
use App\Exceptions\FamilyNotFoundException;

// Utils
use Illuminate\Support\Str;


class FamilyRepository implements FamilyRepositoryContract {

  public function hasCreatedFamilyParents(int $familyId): bool
  {
    $family = FamilyMember::where('family_id', $familyId)->get();

    if ( ! $family->count() ) {
      return false;
    }

    return true;
  }

  public function createFamily(FamilyDto $data): ?Family
  {
    // check if the family already exists
    $family = Family::where('name', $data->familyName)->first();

    if ($family !== null) {
      return $family;
    }

    $family = Family::create([
      'id' => Str::uuid(),
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

    $familyMembers = FamilyMember::where('family_id', $familyId)->get();

    if (count($familyMembers) > 0) {
      throw new CouldNotCreateFamilyParentsException("Family already has members");
    }

    try {
      $family = Family::findOrFail($familyId);
      $familyMembers = $family->members;

      $mainParentFullName = $mainParent->firstName . ' ' . $mainParent->middleName . ' ' . $mainParent->lastName;
      $partnerFullName = $partner->firstName . ' ' . $partner->middleName . ' ' . $partner->lastName;

      $parentOne = [
          'id' => Str::uuid(),
          'family_id' => $familyId,
          "has_account" => 0,
          "user_id" => 0,
          "name" => $mainParentFullName,
          "family_role" => $mainParent->familyTitle,
          "age" => $mainParent->age,
          "email" => $mainParent->parentEmail,
          "attached_email" => $mainParent->hasPartner ? $partner->parentEmail : "null",
      ];

      $parentTwo = [
        'id' => Str::uuid(),
        "family_id" => $familyId,
        "has_account" => 0,
        "user_id" => 0,
        "name" => $partnerFullName,
        "family_role" => $partner->familyTitle,
        "age" => $partner->age,
        "email" => $partner->parentEmail,
        "attached_email" => $partner->hasPartner ? $mainParent->parentEmail : "null",
      ];

      // creating main parent - the onboarder of the family
      $family->members()->createMany([$parentOne, $parentTwo]);

    } catch (CouldNotCreateFamilyParentsException $e) {
      throw new CouldNotCreateFamilyParentsException("Could not create family parents for family ID: $familyId");
    }
  }

  public function createFamilyChildren(int $familyId, array $children): void
  {
    $family = Family::where('id', $familyId)->firstOrFail();

    if ( ! $family ) {
      throw new FamilyNotFoundException('Family with family ID {$familyId} not found');
    }

    foreach ($children as $c => $child) {
      $fullName = $child[$c]["firstName"] . ' ' . $child[$c]['middleName'] . ' ' .  $child[$c]['lastName'];
      $childEmail = $child[$c]['child_email'];

      $family->children()->create([
        // family children arrays goes here
      ]);
    }
  }
}