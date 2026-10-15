<?php

namespace App\Actions\Onboarding;

use App\Dto\FamilyDto as Family;

use App\Services\FamilyService;

class CreateFamily
{
    public function handle(
        array $data
    ): ?\App\Models\Family {
      $service = new FamilyService(app(\App\Contracts\FamilyRepositoryContract::class));

      $family = new Family(
        familyName: $data['familyName'] ?? '',
        familySize: $data['familySize'] ?? 0,
        createdAt: time(),
        updatedAt: time()
      );

      return $service->createFamily($family);
    }
}
