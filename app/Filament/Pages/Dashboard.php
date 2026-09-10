<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;

use App\Filament\Widgets\DashboardWidget;
use App\Filament\Widgets\PostsCountWidget;
use App\Filament\Widgets\OngoingOnboardingSessionsWidget;

class Dashboard extends BaseDashboard
{
    public function getWidgets(): array
    {
      return [
        PostsCountWidget::class,
        OngoingOnboardingSessionsWidget::class,
      ];
    }

    public function getColumns(): int|array
    {
        return 2;
    }
}
