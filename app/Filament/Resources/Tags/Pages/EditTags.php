<?php

namespace App\Filament\Resources\Tags\Pages;

use App\Filament\Resources\Tags\TagsResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditTags extends EditRecord
{
    protected static string $resource = TagsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
