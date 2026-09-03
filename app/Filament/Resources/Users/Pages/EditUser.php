<?php

namespace App\Filament\Resources\Users\Pages;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

use App\Filament\Resources\Users\UserResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected string $notification_title = 'User updated';
    protected string $notification_body = 'The user has been updated successfully';

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $record->update($data);
        return $record;
    }

    protected function getSavedNotification(): ?Notification
    {
        return Notification::make()
            ->title($this->notification_title)
            ->body($this->notification_body)
            ->success();
    }
}
