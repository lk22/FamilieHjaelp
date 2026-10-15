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
        firstName: $parents["parent"]["firstName"],
        middleName: $parents["parent"]["middleName"],
        lastName: $parents["parent"]["lastName"],
        age: $parents["parent"]["age"],
        familyTitle: $parents["parent"]["familyTitle"],
        needsUser: false,
        parentEmail: "",
        hasPartner: $parents["parent"]["hasPartner"] ?? false
      );

      $partner = new FamilyParent(
        familyId: $familyId,
        firstName: $parents["partner"]["partnerFirstName"],
        middleName: $parents["partner"]["partnerMiddleName"],
        lastName: $parents["partner"]["partnerLastName"],
        age: $parents["partner"]["partnerAge"],
        familyTitle: $parents["partner"]["partnerFamilyTitle"],
        needsUser: $parents["partner"]["partnerNeedsUser"],
        parentEmail: $parents["partner"]["partnerUserEmail"],
        hasPartner: false,
      );

      $this->familyService->createFamilyParents($familyId, $mainParent, $partner);
    }
}
