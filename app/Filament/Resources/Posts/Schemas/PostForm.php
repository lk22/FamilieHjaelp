<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Illuminate\Support\Str;
use Filament\Forms\Components\RichEditor;

use Filament\Forms\Components\FileUpload;

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
                self::getExcerptFormField(),
                self::getContentFormField(),
                self::getFeaturedImageFormField()
            ]);
    }

    public static function getTitleFormField(): TextInput
    {
        return TextInput::make('title')
            ->required()
            ->live(onBlur: true)
            ->afterStateUpdated(
                fn($state, callable $set) => $set('slug', Str::slug($state))
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
            ->visibility('public')
            ->directory('images/blog/featured_images') // Specify the directory to store the uploaded images
            ->columnSpanFull()
            ->imageEditor()
            ->imageEditorAspectRatioOptions(
                ['16:9', '4:3', '1:1']
            );
    }
}
