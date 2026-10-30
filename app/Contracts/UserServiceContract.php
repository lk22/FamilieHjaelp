<?php

namespace App\Contracts;

interface UserServiceContract {
  public function createUserLoginWithTemporaryPassword(string $email): bool;
}