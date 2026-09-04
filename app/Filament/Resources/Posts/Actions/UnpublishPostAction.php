<?php

namespace App\Filament\Resources\Posts\Actions;

use Filament\Actions\Action;
use Filament\Support\Icons\HeroIcon;
use App\Models\Post;

class UnpublishPostAction
{
  public static function make(): Action
  {
    return Action::make('Unpublish Post')
      ->requiresConfirmation()
      ->icon(HeroIcon::OutlinedXCircle)
      ->hidden(
        fn (Post $post) => !$post->is_published
      )
      ->action(
        fn (Post $post) => $post->update([
          'is_published' => false,
          'published_at' => null
        ])
      );
  }
}