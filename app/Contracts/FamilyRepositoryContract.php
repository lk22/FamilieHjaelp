<?php

namespace App\Contracts;

use App\Dto\FamilyDto;
use App\Dto\ParentDto;
interface FamilyRepositoryContract {

  public function hasCreatedFamilyParents(string $familyId): bool;
  public function hasCreatedFamilyChildren(string $familyId): bool;
  public function createFamily(FamilyDto $data): ?\App\Models\Family;
  public function associateFamilyParents(
    int $familyId,
    ParentDto $mainParent,
    ?ParentDto $partner
  ): void;

  public function createFamilyChildren(int $familyId, array $children): void;
}