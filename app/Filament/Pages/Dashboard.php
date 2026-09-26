<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;

use App\Filament\Widgets\UsersCountDashboardWidget;
use App\Filament\Widgets\OngoingOnboardingSessionsWidget;
use App\Filament\Widgets\LatestRegisteredUsersCountWidget;

class Dashboard extends BaseDashboard
{
    public function getWidgets(): array
    {
      return [
        UsersCountDashboardWidget::class,
        LatestRegisteredUsersCountWidget::class,
        OngoingOnboardingSessionsWidget::class,
      ];
    }

    public function getColumns(): int|array
    {
        return 1;
    }
}
