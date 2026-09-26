<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\Widget;

class LatestRegisteredUsersCountWidget extends Widget
{
  protected string $view = 'filament.widgets.latest-registered-users-widget';
  public int $latestRegisteredUsersCount;
  public $latestRegisteredUsers;

  public function mount()
  {
      $startDateOfMonth = now()->startOfMonth();
      $endDateOfMonth = now()->endOfMonth();

      $this->latestRegisteredUsers = User::whereBetween('created_at', [$startDateOfMonth, $endDateOfMonth])
        ->take(5)
        ->get();
      $this->latestRegisteredUsersCount = $this->latestRegisteredUsers->count();
  }
}