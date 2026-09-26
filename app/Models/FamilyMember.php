<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\Family;
use App\Models\User;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FamilyMember extends Model
{
    use SoftDeletes, HasFactory; // enables soft deleting for family members and factory support

    protected $fillable = [
        'family_id',
        'has_account',
        'user_id',
        'name',
        'family_role',
        'email',
        'attached_email',
        'age'
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
