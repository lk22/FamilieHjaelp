<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Schemas\Schema;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\DateEntry;
class PostInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title')->columnSpanFull(),
                TextEntry::make('slug')->columnSpanFull(),
                TextEntry::make('created_at')->columnSpanFull(),
                TextEntry::make('excerpt')->columnSpanFull(),
                TextEntry::make('category')->columnSpanFull(),
                TextEntry::make('tags')->columnSpanFull(),
                ImageEntry::make('featured_image')->disk('public')->square()->height(400)
            ]);
    }
}
