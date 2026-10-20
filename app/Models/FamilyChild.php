<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class FamilyChild extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'id',
        'family_id',
        'name',
        'age_year',
        'age_months',
        'age_weeks',
        'needs_user_access',
        'child_email',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $hidden = [
        'id',
        'deleted_at',
        'famiily_id'
    ];

    protected $guarded = [
        'id',
        'family_id'
    ];

    public function family(): BelongsTo
    {
        return $this->belongsTo(Family::class, 'family_id');
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'child_id');
    }
}
