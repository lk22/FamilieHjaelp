<?php

namespace App\Filament\Resources\Posts\Pages;

use Illuminate\Support\Str;

use App\Filament\Resources\Posts\PostResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;

use App\Models\Post;

class CreatePost extends CreateRecord
{
    protected static string $resource = PostResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = auth()->id();
        $data["slug"] = Str::slug($data['title']);
        return $data;
    }

}
