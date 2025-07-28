<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Todo extends Model
{
    protected $fillable = [
        'title',
        'description',
        'is_important',
        'link',
        'due_date',
        'is_completed',
        'completed_at',
        'user_id',
    ];
    
    protected $casts = [
        'due_date' => 'datetime',
        'completed_at' => 'datetime',
        'is_completed' => 'boolean',
        'is_important' => 'boolean',
    ];

    protected $guarded = [
        'id',
        'user_id',
    ];

    protected $hidden = [
        'user_id'
    ];

    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class);
    }
}
