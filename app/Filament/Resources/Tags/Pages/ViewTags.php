<?php

namespace App\Filament\Resources\Tags\Pages;

use App\Filament\Resources\Tags\TagsResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTags extends ViewRecord
{
    protected static string $resource = TagsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
