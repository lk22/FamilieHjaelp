<?php

namespace App\Services;

use App\Contracts\FamilyServiceContract;
use App\Contracts\FamilyRepositoryContract;

use App\Dto\FamilyDto;
use App\Dto\ParentDto;

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
   * @param FamilyDto $family
   */
  public function createFamily(FamilyDto $family): ?\App\Models\Family
  {
    return $this->familyRepository->createFamily($family);
  }

  /**
   * Create family parents attached to the specific family as a main parent and partner if the partner exist
   *
   * @param int $familyId
   * @param ParentDto $mainParent
   * @param ParentDto|null $partner
   * @return bool
   */
  public function createFamilyParents(int $familyId, ParentDto $mainParent, ?ParentDto $partner = null): bool
  {
    $this->familyRepository->associateFamilyParents($familyId, $mainParent, $partner);
    return true;
  }

  /**
   * Creating family children and attaching them to the specific family
   *
   * @param int $familyId
   * @param array $children
   * @return void
   */
  public function createFamilyChildren(int $familyId, array $children): void
  {
    $this->familyRepository->createFamilyChildren($familyId, $children);
  }
}