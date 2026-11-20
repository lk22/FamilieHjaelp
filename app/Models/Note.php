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
        'family_id',
        'family_member_id',
        'is_important',
        'title',
        'slug',
        'note_content',
        'locale',
        'type',
        'created_at',
    ];

    protected $casts = [
        'is_important' => 'boolean',
        'note_content' => 'string',
        'created_at' => 'datetime',
        'locale' => 'string',
        'type' => 'string',
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
        return 'slug';
    }

    public function getGeneralNotes(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->where('type', 'general')->get();
    }

    public function getHealthNotes(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->where('type', 'health')->get();
    }

    public function getImportantNotes(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->where('is_important', true)->get();
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
