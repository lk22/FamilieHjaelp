<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

class Settings extends Page
{
    protected string $view = 'filament.pages.settings';
    protected static ?string $title = 'Settings';

    public static function shouldRegisterNavigation(): bool
    {
        return true;
    }

    public function mount(): void
    {
        abort_unless(true, 403);
    }
}