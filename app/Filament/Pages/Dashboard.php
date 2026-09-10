<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;

use App\Filament\Widgets\DashboardWidget;

class Dashboard extends BaseDashboard
{
    public function getWidgets(): array
    {
      return [
        DashboardWidget::class,
      ];
    }

    public function getColumns(): int|array
    {
        return 2;
    }
}
