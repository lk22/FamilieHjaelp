<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Profile;

class Activity extends Model
{
    /**
     * Fillable fields allowed to be mass assigned
     * 
     * @return $fillable Array<string>
     */
    protected $fillable = [
        "profile_id",
        "child_id",
        "title",
        "description",
        "activity_date"
    ];

    /**
     * Dates for the model
     * 
     * @return $dates array<string>
     */
    protected $dates = ['created_at', 'updated_at'];

    /**
     * return the profile model relationship
     * 
     * @return BelongsTo<Profile>
     */
    public function profile(): BelongsTo {
        return $this->belongsTo(Profile::class, 'profile_id', 'id');
    }
}
