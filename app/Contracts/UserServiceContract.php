<?php

namespace App\Contracts;

use App\Models\User;

interface UserServiceContract {
  public function createUserLoginWithTemporaryPassword(string $email): User;
}