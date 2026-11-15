<?php

namespace App\Filament\Resources\Categories\Pages;

use App\Filament\Resources\Categories\CategoryResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Override;

class CreateCategory extends CreateRecord
{
    protected static string $resource = CategoryResource::class;

    #[Override]
    protected function handleRecordCreation(array $data): Model
    {
        return parent::handleRecordCreation($data);
    }
}
