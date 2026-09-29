<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\LatestRegisteredUsersCountWidget;
use App\Filament\Widgets\OngoingOnboardingSessionsWidget;
use App\Filament\Widgets\UsersCountDashboardWidget;
use Filament\Pages\Dashboard as BaseDashboard;

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
