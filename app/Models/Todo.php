<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Policies\TodoPolicy;

use Illuminate\Database\Eloquent\Attributes\UsePolicy;

#[UsePolicy(TodoPolicy::class)]
class Todo extends Model
{
    /**
     * The attributes that are mass assignable.
     * 
     * @var array<string>
     */
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
    
    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'due_date' => 'datetime',
        'completed_at' => 'datetime',
        'is_completed' => 'boolean',
        'is_important' => 'boolean',
    ];

    /**
     * The attributes that are guarded.
     *
     * @var array<string>
     */
    protected $guarded = [
        'id',
        'user_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<string>
     */
    protected $hidden = [
        'user_id'
    ];

    /**
     * Get the user that owns the todo.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class);
    }
}
