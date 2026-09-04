<?php

namespace App\Filament\Resources\Posts\Actions;

use Filament\Actions\Action;
use Filament\Support\Icons\HeroIcon;
use App\Models\Post;

class PublishPostAction
{
  public static function make(): Action
  {
    return Action::make('Publish Post')
      ->requiresConfirmation()
      ->icon(HeroIcon::OutlinedCheckBadge)
      ->hidden(
        fn (Post $post) => $post->is_published
      )
      ->action(
        fn (Post $post) => $post->update([
          'is_published' => true,
          'published_at' => now()
        ])
      );
  }
}