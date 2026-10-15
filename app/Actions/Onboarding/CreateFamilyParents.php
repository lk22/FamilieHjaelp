<?php

namespace App\Actions\Onboarding;

use App\Contracts\FamilyServiceContract;

use App\Dto\ParentDto as FamilyParent;

class CreateFamilyParents
{
    public function __construct(private FamilyServiceContract $familyService) {}

    public function handle(
        int $familyId,
        array $parents
    ): void {
      $mainParent = new FamilyParent(
        familyId: $familyId,
        firstName: $parents["parent"]["firstname"],
        middleName: $parents["parent"]["middlename"],
        lastName: $parents["parent"]["lastname"],
        age: $parents["parent"]["age"],
        familyRole: $parents["parent"]["familyRole"],
        needsUser: $parents["parent"]["needs_user"],
        parentEmail: $parents["parent"]["parent_email"],
        hasPartner: $parents["parent"]["needs_partner"] ?? false
      );

      $partner = new FamilyParent(
        familyId: $familyId,
        firstName: $parents["partner"]["firstname"],
        middleName: $parents["partner"]["middlename"],
        lastName: $parents["partner"]["lastname"],
        age: $parents["partner"]["age"],
        familyRole: $parents["partner"]["familyRole"],
        needsUser: $parents["partner"]["needs_user"],
        parentEmail: $parents["partner"]["parent_email"],
        hasPartner: false,
      );

      $this->familyService->createFamilyParents($familyId, $mainParent, $partner);
    }
}
