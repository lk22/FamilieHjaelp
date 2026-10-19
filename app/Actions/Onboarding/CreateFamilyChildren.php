<?php

namespace App\Actions\Onboarding;

use App\Contracts\FamilyServiceContract;

use App\Dto\ChildDto;
class CreateFamilyChildren
{
    public function __construct(private FamilyServiceContract $familyService) {}

    public function handle(
        int $familyId,
        array $children
    ): void {

        $childrenList = [];

        foreach ($children as $child) {
            $childrenList[] = new ChildDto(
                firstName: $child["firstName"],
                middleName: $child["middleName"],
                lastName: $child["lastName"],
                ageYear: $child["ageYear"],
                ageMonth: $child["ageMonth"],
                ageWeeks: $child["ageWeeks"],
                needsUser: $child["needsUser"] ?? null,
                childEmail: $child["childEmail"] ?? null
            );
        }

        $this->familyService->createFamilyChildren($familyId, $childrenList);
    }
}
