<?php

namespace App\Filament\Widgets;

use App\Models\OnboardingSession;
use Filament\Widgets\Widget;

class OngoingOnboardingSessionsWidget extends Widget
{
    protected string $view = 'filament.widgets.ongoing-onboarding-sessions-widget';

    public int $ongoingOnboardingSessionsCount = 0;

    public function mount()
    {
        $this->ongoingOnboardingSessionsCount = OnboardingSession::count();
    }
}
