<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    use HasFactory;

    protected $table = 'family_notes';

    /**
     * The attributes that mass assign.
     */
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
        'updated_at',
        'is_archived',
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
     * Indicates if the model should be timestamped.
     */
    public $timestamps = true;

    /**
     * The attributes that should be cast to native types for soft deletes.
     */
    protected $softDeletes = false; // Manual archiving via is_archived flag instead of true soft delete

    /**
     * Get the routes key for route model bindings.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Scope a query to only include archived notes.
     */
    public function scopeArchived($query)
    {
        return $query->where('is_archived', true);
    }

    /**
     * Scope a query to only include non-archived notes.
     */
    public function scopeNotArchived($query)
    {
        return $query->where('is_archived', false);
    }


    public function familyMember(): BelongsTo
    {
        return $this->belongsTo(FamilyMember::class, 'family_member_id', 'id');
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
