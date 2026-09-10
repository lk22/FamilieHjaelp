<?php

namespace App\Filament\Resources\Tags\Schemas;

use Filament\Schemas\Schema;
use Filament\Infolists\Components\TextEntry;

class TagsInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                self::getNameEntry(),
                self::getSlugEntry(),
                self::getCreatedAtEntry(),
                self::getUpdatedAtEntry(),
                self::getLocaleEntry(),
            ]);
    }

    public static function getNameEntry(): TextEntry
    {
        return TextEntry::make('name');
    }

    public static function getSlugEntry(): TextEntry
    {
        return TextEntry::make('slug');
    }

    public static function getCreatedAtEntry(): TextEntry
    {
        return TextEntry::make('created_at')
            ->dateTime()
            ->placeholder('-');
    }

    public static function getUpdatedAtEntry(): TextEntry
    {
        return TextEntry::make('updated_at')
            ->dateTime()
            ->placeholder('-');
    }

    public static function getLocaleEntry(): TextEntry
    {
        return TextEntry::make('locale')->formatStateUsing(function($state) {
            if ( $state === 'da' ) {
                return 'Danish';
            } else if ($state === 'en') {
                return 'English';
            }
            return $state; // fallback to the original state if no match
        });
    }
}
