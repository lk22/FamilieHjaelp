<?php

namespace App\Filament\Resources\Posts\Pages;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

use App\Filament\Resources\Posts\PostResource;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Filament\Support\Exceptions\Halt;
use Throwable;

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

    protected function handleRecordCreation(array $data): Model
    {
        try {
            return parent::handleRecordCreation($data);
        } catch (Throwable $exception) {
            report($exception);
            Notification::make()
                ->title('Failed to create the post.')
                ->body($exception->getMessage())
                ->danger()
                ->send();

            throw new Halt();
        }
    }
}
