<?php

namespace App\Contracts;

use App\Dto\FamilyDto;

interface FamilyServiceContract {
  public function createFamily(FamilyDto $family): ?\App\Models\Family;
  public function createFamilyParents($familyId, $mainParent, $partner): void;
}