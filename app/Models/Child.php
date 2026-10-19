<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Child extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'id',
        'family_id',
        'name',
        'age_years',
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
}
