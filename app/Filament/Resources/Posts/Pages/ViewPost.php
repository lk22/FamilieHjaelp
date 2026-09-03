<?php

namespace App\Filament\Resources\Posts\Pages;

use App\Filament\Resources\Posts\PostResource;
use Filament\Actions\EditAction;
use App\Filament\Resources\Posts\Actions\PublishPostAction;
use App\Filament\Resources\Posts\Actions\UnpublishPostAction;
use Filament\Resources\Pages\ViewRecord;

use App\Filament\Resources\Posts\Widgets\PostOverviewWidget;

class ViewPost extends ViewRecord
{
    protected static string $resource = PostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
            PublishPostAction::make(),
            UnpublishPostAction::make(),
        ];
    }

}
