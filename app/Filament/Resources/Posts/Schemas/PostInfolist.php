<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Schemas\Schema;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ImageEntry;
use Illuminate\Support\HtmlString;

use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Section;


class PostInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                ImageEntry::make('featured_image')
                    ->disk('public')
                    ->square()
                    ->imageWidth(300)
                    ->imageHeight(300)
                    ->columnSpanFull(),
                Section::make()->description('Article information')
                    ->schema([
                        Grid::make([
                            'default' => 2
                        ])->schema([
                            Section::make()->schema([
                                TextEntry::make('title')
                                    ->columnSpanFull(),
                                TextEntry::make('slug')
                                    ->columnSpanFull(),
                                TextEntry::make('url')
                                    ->columnSpanFull(),
                                TextEntry::make('category')
                                    ->columnSpanFull(),
                                TextEntry::make('tags.name')
                                    ->columnSpanFull(),
                            ]),
                            Section::make()->schema([
                                TextEntry::make('created_at')
                                    ->columnSpanFull(),
                                TextEntry::make('is_featured')
                                    ->columnSpanFull(),
                                TextEntry::make('is_published')
                                    ->columnSpanFull(),
                                TextEntry::make('locale')
                                    ->columnSpanFull(),
                            ]),
                        ]),
                    ])->columnSpanFull(),

                Section::make()->description('Article Content')
                    ->schema([
                       TextEntry::make('excerpt')
                                ->columnSpanFull()
                                ->formatStateUsing(fn ($state) => new HtmlString(\Illuminate\Support\Str::limit($state, 100))),
                        TextEntry::make('content')
                            ->columnSpanFull()
                            ->formatStateUsing(fn ($state) => new HtmlString(\Illuminate\Support\Str::limit($state, 100))),
                    ])->columnSpanFull(),
            ]);
    }
}
