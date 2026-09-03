<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Schemas\Schema;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ImageEntry;
use Illuminate\Support\HtmlString;


class PostInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title')
                    ->columnSpanFull(),
                TextEntry::make('slug')
                    ->columnSpanFull(),
                TextEntry::make('url')
                    ->columnSpanFull(),
                TextEntry::make('created_at')
                    ->columnSpanFull(),
                TextEntry::make('excerpt')
                    ->columnSpanFull()
                    ->formatStateUsing(fn ($state) => new HtmlString(\Illuminate\Support\Str::limit($state, 100))),
                TextEntry::make('content')
                    ->columnSpanFull()
                    ->formatStateUsing(fn ($state) => new HtmlString(\Illuminate\Support\Str::limit($state, 100))),
                TextEntry::make('category')
                    ->columnSpanFull(),
                TextEntry::make('tags.name')
                    ->columnSpanFull(),
                TextEntry::make('is_featured')
                    ->columnSpanFull(),
                TextEntry::make('is_published')
                    ->columnSpanFull(),
                TextEntry::make('locale')
                    ->columnSpanFull(),
                ImageEntry::make('featured_image')
                    ->disk('public')
                    ->square()
                    ->columnSpanFull()
            ]);
    }
}
