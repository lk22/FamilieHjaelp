<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Schemas\Schema;
use Illuminate\Support\HtmlString;

use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ImageEntry;

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
                        \Illuminate\Support\Str::limit($state, 100)
                    ))
                    ->limit(50),
            ]);
    }
}
