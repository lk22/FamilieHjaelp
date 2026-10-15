<?php

namespace App\Services;

use App\Contracts\FamilyServiceContract;
use App\Contracts\FamilyRepositoryContract;

use App\Dto\FamilyDto;

class FamilyService implements FamilyServiceContract
{
  public function __construct(
    private FamilyRepositoryContract $familyRepository
  )
  {
    $this->familyRepository = $familyRepository;
  }

  /**
   * Creating a new family resource through the repository
   *
   * @param FamilyDto $data
   */
  public function createFamily(FamilyDto $family): ?\App\Models\Family
  {
    return $this->familyRepository->createFamily($family);
  }
  public function createFamilyParents($familyId, $mainParent, $partner): void
  {
    $this->familyRepository->associateFamilyParents($familyId, $mainParent, $partner);
  }
}