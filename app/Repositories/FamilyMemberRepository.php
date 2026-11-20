<?php

namespace App\Repositories;

use App\Models\FamilyMember;

class FamilyMemberRepository
{
  public function __construct()
  {

  }

  public function findByUserId($userId)
  {
      return FamilyMember::where('user_id', $userId)->first();
  }

  public function findAllFamilyMembers($familyId)
  {
    return FamilyMember::where('family_id', $familyId)->get();
  }
}