<?php

namespace App\Services;

use App\Contracts\UserServiceContract;

use App\Models\User;

use Illuminate\Auth\Events\Registered;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService implements UserServiceContract
{
  public function __construct() {}

  public function createUserLoginWithTemporaryPassword(string $email): User {
    $password = "Family";
    $hashed = Hash::make($password);

    $user = User::create([
      "name" => $email,
      "email" => $email,
      "password" => $hashed,
      "is_admin" => false,
      "has_completed_onboarding" => true,
      "is_verified" => false,
      "family_child_id" => null,
      "family_member_id" => null,
      "family_id" => null,
    ]);

    return $user;
  }
}