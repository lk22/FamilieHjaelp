<?php

namespace App\Contracts;

use App\Dto\FamilyDto;

interface FamilyServiceContract {
  public function createFamily(FamilyDto $family): ?\App\Models\Family;
  public function createFamilyParents($familyId, $mainParent, $partner): void;

  public function createFamilyChildren(int $familyId, array $children): void;
}