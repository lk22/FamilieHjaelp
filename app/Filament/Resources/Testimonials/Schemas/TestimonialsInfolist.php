<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

class TestimonialsInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title'),
                TextEntry::make('name'),
                TextEntry::make('locale'),
                ImageEntry::make('image'),
                TextEntry::make('content')
                    ->columnSpanFull()
                    ->formatStateUsing(fn ($state) => new HtmlString(
                        Str::limit($state, 100)
                    ))
                    ->limit(50),
            ]);
    }
}
