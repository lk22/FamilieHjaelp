<?php

namespace App\Services;

use App\Contracts\UserServiceContract;

use App\Models\User;

use Illuminate\Auth\Events\Registered;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService implements UserServiceContract
{
  public function __construct() {}

  public function createUserLoginWithTemporaryPassword(string $email): bool {
    $password = "Family";
    $hashed = Hash::make($password);

    $user = User::create([
      "name" => $email,
      "email" => $email,
      "password" => $hashed,
      "is_admin_false",
      "has_completed_onboarding" => true,
      "is_verified" => false
    ]);

    event(new Registered($user));

    Auth::login($user);

    return true;
  }
}