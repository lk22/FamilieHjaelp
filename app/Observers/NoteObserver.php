<?php

namespace App\Observers;

use App\Models\Note;
use Illuminate\Support\Facades\Log;
use App\Models\User;

use App\Notifications\FirstNoteCreated;

class NoteObserver
{
    /**
     * Handle the Note "created" event.
     */
    public function created(Note $note): void {
        if (config('app.debug')) {
            Log::info('Note created: ', $note->toArray());
        }

        $user = User::find($note->user_id);

        if ( $user ) {
            Log::info('Note created by user: ', $user->toArray());

            if ( $user->notes()->count() < 2 ) {
                Log::info('User has less than 2 notes. Consider sending notification email.');
                $user->notify(new FirstNoteCreated($note, $user->notes()->count()));

                $user->notifications()->create([
                    'notification_type' => 'first_note_created',
                    'message' => 'Tillykke med din første note! Du har nu oprettet din første note.',
                    'is_read' => false,
                    'user_id' => $user->id
                ]);
            }
        } else {
            Log::warning('User not found for note: ', $note->toArray());
        }
    }

    /**
     * Handle the Note "updated" event.
     */
    public function updated(Note $note): void
    {
        if (config('app.debug')) {
            Log::info('Note updated: ', $note->toArray());
        }

        $user = User::find($note->user_id);
        if ( $user ) {
            Log::info('Note updated by user: ', $user->toArray());

            if ($user->notes()->count() < 2) {
                Log::info('User has less than 2 notes. Consider sending notification email.');
                // Send notification for first note if applicable

                $user->notifications()->create([
                    'notification_type' => 'first_note_updated',
                    'message' => 'Tillykke med din første note! Du har nu opdateret din første note.',
                    'is_read' => false,
                    'user_id' => $user->id
                ]);
            }
        }
    }

    /**
     * Handle the Note "deleted" event.
     */
    public function deleted(Note $note): void
    {
        if (config('app.debug')) {
            Log::info('Note deleted: ', $note->toArray());
        }
    }

    /**
     * Handle the Note "restored" event.
     */
    public function restored(Note $note): void
    {
        //
    }

    /**
     * Handle the Note "force deleted" event.
     */
    public function forceDeleted(Note $note): void
    {
        //
    }
}
