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
use App\Exceptions\CouldNotCreateFamilyChildrenException;


// Utils
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;


class FamilyRepository implements FamilyRepositoryContract {
  /**
   * check that family members exists in a family relation
   *
   * @param string $familyId
   * @return bool
   */
  public function hasCreatedFamilyParents(string $familyId): bool
  {
    $family = FamilyMember::where('family_id', $familyId)->get();

    if ( ! $family->count() ) {
      return false;
    }

    return true;
  }

  /**
   * Check that a family has created family children
   *
   * @param string $familyId
   * @return bool
   */
  public function hasCreatedFamilyChildren(string $familyId): bool
  {
    $family = Family::where('id', $familyId)->first();

    if ( ! $family ) {
      return false;
    }

    $children = $family->children;

    if ( ! $children->count() ) {
      return false;
    }

    return true;
  }
  /**
   * Create a new family.
   *
   * @param FamilyDto $data
   * @return Family|null
   */
  public function createFamily(FamilyDto $data): ?Family
  {
    $family = Family::where('name', $data->familyName)->first();

    if ( $family !== null ) {
      return $family;
    }

    DB::beginTransaction();

    try {
      $family = Family::create([
        'name' => $data->familyName,
        'family_size' => $data->familySize,
        'created_at' => $data->createdAt,
        'updated_at' => $data->updatedAt,
      ]);
      DB::commit();
    } catch (\Exception $e) {
      DB::rollBack();
      throw new FamilyNotCreatedException("Could not create family");
    }

    return $family;
  }

  /**
   * Associate family parent members
   *
   * @param int $familyId
   * @param ParentDto $mainParent
   * @param ParentDto $partner
   * @throws CouldNotCreateFamilyParentsException
   * @return void
   */
  public function associateFamilyParents(
    int $familyId,
    ParentDto $mainParent,
    ?ParentDto $partner = null
  ): void
  {
    $family = Family::findOrFail($familyId);

    if ($family->members->exists()) {
      throw new CouldNotCreateFamilyParentsException("Family already has members");
    }

    $mainParentFullName = implode(' ', array_filter([
      $mainParent->firstName,
      $mainParent->middleName,
      $mainParent->lastName
    ]));

    $parents = [
      [
        'family_id' => $familyId,
        'has_account' => 0,
        'user_id' => 0,
        'name' => $mainParentFullName,
        'family_role' => $mainParent->familyTitle,
        'age' => $mainParent->age,
        'email' => $mainParent->parentEmail,
        'attached_email' => $mainParent->parentEmail ?? null
      ]
    ];

    if ($partner) {
      $partnerFullName = implode(' ', array_filter([
        $partner->firstName,
        $partner->middleName,
        $partner->lastName
      ]));
      $parents[] = [
        'family_id' => $familyId,
        'has_account' => 0,
        'user_id' => 0,
        'name' => $partnerFullName,
        'family_role' => $partner->familyTitle,
        'age' => $partner->age,
        'email' => $partner->parentEmail,
        'attached_email' => $partner->parentEmail ?? null
      ];
    }

    DB::transaction(function() use ($family, $parents) {
      $family->members->createMany($parents);
    });
  }

  /**
   * Associatate children in the family
   *
   * @param int $familyId
   * @param array $children
   * @throws FamilyNotFoundException
   * @throws CouldNotCreateFamilyChildrenException
   * @return void
   */
  public function createFamilyChildren(int $familyId, array $children): void
  {
    // dd($children[0]);
    $family = Family::where('id', $familyId)->firstOrFail();
    $familyChildren = $family->children;

    if ( ! $family ) {
      throw new FamilyNotFoundException('Family with family ID {$familyId} not found');
    }

    if (count($familyChildren) > 0) {
      throw new CouldNotCreateFamilyChildrenException("Family already has children");
    }

    $childrenData = [];

    foreach ($children as $c => $child) {
      $fullName = $child->firstName . ' ' . $child->middleName . ' ' .  $child->lastName;
      $childEmail = $child->childEmail ?? "";
      $ageMonths = $child->ageMonths ?? 0;
      $ageWeeks = $child->ageWeeks ?? 0;
      $childrenData[] = [
        "family_id" => $familyId,
        "name" => $fullName,
        "age_year" => $child->ageYears,
        "age_months" => $ageMonths,
        "age_weeks" => $ageWeeks,
        "child_email" => $childEmail,
        "needs_user_access" => $child->needsUserAccess ?? 0,
      ];
    }

    DB::transaction(function() use ($family, $childrenData) {
      $family->children()->createMany($childrenData);
    });
  }
}