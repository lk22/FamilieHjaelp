<?php

namespace App\Filament\Resources\Tags;

use App\Filament\Resources\Tags\Pages\CreateTags;
use App\Filament\Resources\Tags\Pages\EditTags;
use App\Filament\Resources\Tags\Pages\ListTags;
use App\Filament\Resources\Tags\Pages\ViewTags;
use App\Filament\Resources\Tags\Schemas\TagsForm;
use App\Filament\Resources\Tags\Schemas\TagsInfolist;
use App\Filament\Resources\Tags\Tables\TagsTable;
use App\Models\Tag;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

use App\Filament\Resources\Posts\PostResource;

class TagsResource extends Resource
{
    protected static ?string $model = Tag::class;

    protected static ?string $navigationParentItem = PostResource::class;

    protected static string | UnitEnum | null $navigationGroup = 'Content';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationLabel = 'Tags';

    public static function form(Schema $schema): Schema
    {
        return TagsForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TagsInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TagsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTags::route('/'),
            'create' => CreateTags::route('/create'),
            'view' => ViewTags::route('/{record}'),
            'edit' => EditTags::route('/{record}/edit'),
        ];
    }
}
