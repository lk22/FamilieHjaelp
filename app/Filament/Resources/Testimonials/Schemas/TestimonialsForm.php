<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;

class TestimonialsForm
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
                self::getTitleField(),
                self::getNameField(),
                self::getContentLocaleField(),
                self::getImageField(),
                self::getContentField(),
            ]);
    }

    public static function getTitleField(): TextInput
    {
        return TextInput::make('title')
            ->required()
            ->live(onBlur: true)
            ->columnSpanFull();
    }

    public static function getNameField(): TextInput
    {
        return TextInput::make('name')
            ->required()
            ->live(onBlur: true)
            ->columnSpanFull();
    }

    public static function getContentLocaleField(): TextInput
    {
        return TextInput::make('locale')
            ->required()
            ->live(onBlur: true)
            ->columnSpanFull();
    }

    public static function getImageField(): FileUpload
    {
        return FileUpload::make('image')
            ->image()
            ->disk('public')
            ->maxSize(1024) // Maximum file size in kilobytes (1 MB)
            ->visibility('/public/storage')
            ->directory('testimonials')
            ->columnSpanFull()
            ->imageEditor()
            ->imageEditorAspectRatioOptions([
                '16:9',
                '4:3',
                '1:1'
            ]);
    }

    public static function getContentField(): RichEditor
    {
        return RichEditor::make('content')
            ->required()
            ->toolbarButtons(self::$toolbar)
            ->columnSpanFull();
    }
}