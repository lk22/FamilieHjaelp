<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Family extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'family_size',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function members(): HasMany
    {
        return $this->hasMany(FamilyMember::class, 'family_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(FamilyMember::class, 'family_id')->where('family_role', 'child');
    }
}
