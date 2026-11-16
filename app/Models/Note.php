<?php

namespace App\Models;

use App\Notifications\FirstNoteCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class Note extends Model
{
    use HasFactory;

    protected $table = 'family_notes';

    protected $fillable = [
        'user_id',
        'family_member_id',
        'note_content',
        'created_at',
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
        'family_member_id',
    ];

    /**
     * Getting default key name for route model bindings
     */
    public function getRouteKeyName(): string
    {
        return 'id';
    }

    /**
     * Get the user that owns the note.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
