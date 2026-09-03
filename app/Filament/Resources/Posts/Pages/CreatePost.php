<?php

namespace App\Filament\Resources\Posts\Pages;

use Illuminate\Support\Str;

use App\Filament\Resources\Posts\PostResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePost extends CreateRecord
{
    protected static string $resource = PostResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = auth()->id();
        $data["slug"] = Str::slug($data['title']);
        $locale = $data['locale'] ?? 'da';
        $data['url'] = url($locale . '/blog/articles/' . $data['slug']);
        return $data;
    }
}
