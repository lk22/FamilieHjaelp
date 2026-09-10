<?php

namespace App\Filament\Widgets;

use App\Models\Post;
use Filament\Widgets\Widget;

class DashboardWidget extends Widget
{
    protected string $view = 'filament.widgets.dashboard-widget-test';

    public array $posts = [];

    public function mount()
    {
        $this->posts = Post::where('is_published', true)->latest()->get()->map(function ($post) {
            return [
                'title' => $post->title,
                'excerpt' => $post->excerpt,
                'locale' => $post->locale,
                'categories' => $post->categories->pluck('name')->toArray(),
            ];
        })->toArray();
    }
}
