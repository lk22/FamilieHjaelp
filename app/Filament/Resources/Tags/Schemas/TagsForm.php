<?php

namespace App\Filament\Resources\Tags\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;

class TagsForm
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
        return TextInput::make('name')->label('name')->required();
    }

    public static function getSlugField(): TextInput
    {
        return TextInput::make('slug')->label('slug')->required();
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
