<?php

namespace App\Contracts;

use App\Dto\FamilyDto;
use App\Dto\ParentDto;

interface FamilyServiceContract {
  public function createFamily(FamilyDto $family): ?\App\Models\Family;
  public function createFamilyParents(int $familyId, ParentDto $mainParent, ?ParentDto $partner = null): bool;

  public function createFamilyChildren(int $familyId, array $children): void;
}