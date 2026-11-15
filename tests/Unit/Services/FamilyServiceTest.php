<?php
namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Contracts\FamilyServiceContract;
use App\Services\FamilyService;

use App\Dto\FamilyDto;
use App\Dto\ParentDto;

use App\Models\Family;

use Mockery;

class FamilyServiceTest extends TestCase
{
  use RefreshDatabase;
  public function test_family_service_contract_implemtation()
  {
    $service = app(FamilyService::class);

    // assert that the service implements the contract
    $this->assertInstanceOf(FamilyServiceContract::class, $service);
  }

  public function test_family_service_can_be_resolved_from_container()
  {
    $service = app(FamilyService::class);

    $this->assertInstanceOf(FamilyService::class, $service);
  }

  public function test_family_service_can_create_family()
  {
    $service = Mockery::mock(FamilyService::class);
    $familyName = 'Smith';
    $familySize = 4;
    $createdAt = now();
    $updatedAt = now();

    $family = new FamilyDto(
      $familyName,
      $familySize,
      $createdAt,
      $updatedAt
    );

    $service->shouldReceive('createFamily')
      ->once()
      ->with($family)
      ->andReturn(new Family);

    $this->assertInstanceOf(Family::class, $service->createFamily($family));
  }

  public function test_family_service_can_create_family_parents_without_partner()
  {
    $familyId = 1;
    $mainParent = new ParentDto(
      familyId: $familyId,
      firstName: 'John',
      middleName: 'William',
      lastName: 'Doe',
      age: 40,
      familyTitle: 'Father',
      needsUser: false,
      parentEmail: 'john.doe@example.com',
      hasPartner: false
    );

    $repository = Mockery::mock(\App\Repositories\FamilyRepository::class);
    $repository->shouldReceive('associateFamilyParents')
      ->once()
      ->with($familyId, $mainParent, null)
      ->andReturn(true);

    $service = new FamilyService($repository);
    $result = $service->createFamilyParents($familyId, $mainParent, null);

    $this->assertTrue($result);
  }

  public function test_family_service_can_create_family_parents_with_partner()
  {
    $familyId = 1;
    $mainParent = new ParentDto(
      familyId: $familyId,
      firstName: 'John',
      middleName: 'William',
      lastName: 'Doe',
      age: 40,
      familyTitle: 'Father',
      needsUser: false,
      parentEmail: 'john.doe@example.com',
      hasPartner: true
    );

    $partner = new ParentDto(
      familyId: $familyId,
      firstName: 'Jane',
      middleName: 'Elizabeth',
      lastName: 'Doe',
      age: 38,
      familyTitle: 'Mother',
      needsUser: false,
      parentEmail: 'jane.doe@example.com',
      hasPartner: true
    );

    $repository = Mockery::mock(\App\Repositories\FamilyRepository::class);
    $repository->shouldReceive('associateFamilyParents')
      ->once()
      ->with($familyId, $mainParent, $partner)
      ->andReturn(true);

    $service = new FamilyService($repository);
    $result = $service->createFamilyParents($familyId, $mainParent, $partner);

    $this->assertTrue($result);
  }
}