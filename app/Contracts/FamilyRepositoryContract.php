<?php

namespace App\Contracts;

use App\Dto\FamilyDto;
interface FamilyRepositoryContract {

  public function hasCreatedFamilyParents(string $familyId): bool;
  public function hasCreatedFamilyChildren(string $familyId): bool;
  public function createFamily(FamilyDto $data): ?\App\Models\Family;
  public function associateFamilyParents(
    int $familyId,
    \App\Dto\ParentDto $mainParent,
    \App\Dto\ParentDto $partner
  ): void;

  public function createFamilyChildren(int $familyId, array $children): void;
}