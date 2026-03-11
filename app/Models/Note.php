<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Notifications\FirstNoteCreated;

use App\Models\User;
use App\Models\ProfileNotification;

use Illuminate\Support\Facades\Log;

class Note extends Model
{
    use HasFactory;

    protected $table = 'profile_notes';

    protected $fillable = [
        'user_id', 
        'child_id', 
        'note_content',
        'created_at'
    ];

    protected $casts = [
        'note_content' => 'string',
        'created_at' => 'datetime',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'user_id',
        'child_id'
    ];

    /**
     * Getting default key name for route model bindings
     * 
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return 'id';
    }

    /**
     * Apply model event hooks
     * 
     * @return void
     */
    protected static function booted(): void
    {
        static::created(function ($note) {
            if (config('app.debug')) {
                Log::info('Note created: ', $note->toArray());
            }
            // get the user who created the note
            $user = User::find($note->user_id);

            if ( $user ) {
                Log::info('Note created by user: ', $user->toArray());
                // send first profile notification if its the users first or second note
                if ( $user->notes()->count() < 2 ) {
                    // if the user has created less than 2 notesm send the user an email notification
                    Log::info('User has less than 2 notes. Consider sending notification email.');
                    $user->notify(new FirstNoteCreated($note, $user->notes()->count()));

                    $user->notifications()->create([
                        "notification_type" => 'first_note_created',
                        'message' => "Tillykke med din første note! Du har nu oprettet din første note.",
                        "is_read" => false,
                        "user_id" => $user->id
                    ]);
                }
             } else {
                Log::warning('User not found for note: ' . $note->id);
            }
        });

        // trigger deleted event for each note is deleted from the user
        // TODO add a notification here as well if needed
        // TODO consider if its the first note that is deleted from the user
        static::deleted(function ($note) {
            if (config('app.debug')) {
                Log::info('Note deleted: ', $note->toArray());
            }
        });
    }

    /**
     * Get the user that owns the note.
     * 
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class, 'user_id', 'id', 'notes');
    }
}
