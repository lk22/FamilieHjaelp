<?php

namespace App\Filament\Widgets;

use App\Models\Post;
use Filament\Widgets\Widget;

class PostsCountWidget extends Widget
{
    protected string $view = 'filament.widgets.posts-count-widget';

    public int $postsCount = 0;

    public function mount()
    {
        $this->postsCount = Post::where('is_published', true)->count();
    }
}
