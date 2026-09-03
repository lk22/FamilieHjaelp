<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                DateTimePicker::make('email_verified_at'),
                TextInput::make('password')
                    ->password()
                    ->required(),
                Toggle::make('has_completed_onboarding')
                    ->required(),
                Toggle::make('is_verified')
                    ->required(),
                Toggle::make('is_admin')
                    ->required(),
                TextInput::make('notes_count')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
