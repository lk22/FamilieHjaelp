<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Illuminate\Support\Str;
use Filament\Forms\Components\RichEditor;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;

class PostForm
{

    protected static array $toolbar = [
        ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'code'],
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        ['alignStart', 'alignCenter', 'alignEnd'],
        ['blockquote', 'codeBlock', 'bulletList', 'orderedList'],
        ['table', 'attachFiles'],
        ['undo', 'redo']
    ];

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                self::getTitleFormField(),
                self::getSlugFormField(),
                self::getUrlFormField(),
                self::getLocaleFormField(),
                self::getTagsFormField(),
                self::getCategoryFormField(),
                self::getExcerptFormField(),
                self::getContentFormField(),
                self::getFeaturedImageFormField(),
            ]);
    }

    public static function getTitleFormField(): TextInput
    {
        return TextInput::make('title')
            ->required()
            ->live(onBlur: true)
            ->afterStateUpdatedJs(
                fn($state, callable $set) => $set('slug', Str::slug($state))
            )
            ->afterStateUpdatedJs(
                fn($state, callable $set) => $set('url', url(request('locale') . '/blog/articles/' . Str::slug($state)))
            )
            ->columnSpanFull();
    }

    public static function getSlugFormField(): TextInput
    {
        return TextInput::make('slug')
            ->readOnly()
            ->required()
            ->dehydrated()
            ->columnSpanFull();
    }

    public static function getUrlFormField(): TextInput
    {
        return TextInput::make('url')
            ->readOnly()
            ->required()
            ->dehydrated()
            ->columnSpanFull();
    }

    public static function getLocaleFormField(): Select
    {
        return Select::make('locale')
            ->required()
            ->options([
                'da' => 'Dansk',
                'en' => 'English',
            ])
            ->afterStateUpdatedJs(
               fn($state, callable $set) => $set('url', url($state . '/blog/articles/' . Str::slug(request('title'))))
            )
            ->columnSpanFull();
    }

    public static function getExcerptFormField(): RichEditor
    {
        return RichEditor::make('excerpt')
            ->columnSpanFull()
            ->toolbarButtons(self::$toolbar);
    }

    public static function getContentFormField(): RichEditor
    {
        return RichEditor::make('content')
            ->columnSpanFull()
            ->toolbarButtons(self::$toolbar);
    }

    public static function getFeaturedImageFormField(): FileUpload
    {
        return FileUpload::make('featured_image')
            ->image()
            ->disk('public')
            ->maxSize(1024) // Maximum file size in KB
            ->visibility('/public/storage')
            ->directory('featured_images') // Specify the directory to store the uploaded images
            ->columnSpanFull()
            ->imageEditor()
            ->imageEditorAspectRatioOptions(
                ['16:9', '4:3', '1:1']
            );
    }

    public static function getTagsFormField(): Select
    {
        return Select::make('tags')
            ->multiple()
            ->preload()
            ->createOptionForm([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required()
                    ->unique()
                    ->dehydrated(fn($state) => !empty($state))
            ])
            ->relationship('tags', 'name')
            ->columnSpanFull();
    }

    public static function getCategoryFormField(): Select
    {
        return Select::make('category')
            ->multiple()
            ->preload()
            ->createOptionForm([
                TextInput::make('name')->required(),
                TextInput::make('slug')->required()->unique()->dehydrated(
                    fn($state) => !empty($state)
                )
            ])
            ->relationship('categories', 'name')
            ->columnSpanFull();
    }
}
