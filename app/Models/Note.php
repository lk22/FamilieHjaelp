<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\User;

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
     * Get the user that owns the note.
     * 
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class, 'user_id', 'id', 'notes');
    }
}
