<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\Widget;

class UsersCountDashboardWidget extends Widget
{
  protected string $view = 'filament.widgets.users-count-widget';

  public int $usersCount = 0;

  public function gotoUsersPage()
  {
      return redirect()->to('/admin/users');
  }

  public function mount(): void
  {
    $this->usersCount = User::count();
  }
}