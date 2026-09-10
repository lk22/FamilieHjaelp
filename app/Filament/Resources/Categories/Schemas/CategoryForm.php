<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                self::getNameField(),
                self::getSlugField(),
                self::getLocaleField(),
            ]);
    }

    public static function getNameField(): TextInput
    {
        return TextInput::make('name')->required();
    }

    public static function getSlugField(): TextInput
    {
        return TextInput::make('slug')->required();
    }

    public static function getLocaleField(): Select
    {
        return Select::make('locale')
            ->label('Locale')
            ->options([
                'en' => 'English',
                'da' => 'Danish',
            ])
            ->required();
    }
}
