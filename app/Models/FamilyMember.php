<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class FamilyMember extends Model
{
    use HasFactory, SoftDeletes; // enables soft deleting for family members, factory support, and UUID primary keys

    protected $fillable = [
        'id',
        'family_id',
        'has_account',
        'user_id',
        'name',
        'family_role',
        'age',
        'email',
        'attached_email',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $hidden = ['id','family_id', 'user_id'];
    protected $guarded = ['id', 'family_id', 'user_id'];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function family(): BelongsTo
    {
        return $this->belongsTo(Family::class, 'family_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
