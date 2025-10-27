<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\Profile;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'child_id', 
        'note_content'
    ];

    /**
     * Get the user that owns the note.
     * 
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function profile(): BelongsTo 
    {
        return $this->belongsTo(Profile::class, 'user_id', 'id', 'notes');
    }
}
