<?php

namespace App\Filament\Resources\Posts\Widgets;

use Filament\Widgets\Widget;
use \Illuminate\View\View;

use App\Models\Post;

class PostOverviewWidget extends Widget
{
    protected string $view = 'filament.resources.posts.widgets.post-overview-widget';


    public function getPost(): ?Post
    {
        // Return the post if it exists, otherwise return null
        return $this->post;
    }

    public function render(): View
    {
        return view($this->view);
    }
}