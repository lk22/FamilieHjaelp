<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\User;
use App\Models\Activity;

class Profile extends Model
{
    /**
     * Assign the table fields to be mass assignable
     * 
     * @var Array<string>
     */
    protected $fillable = [
        'user_id',
        'onboarding_data',
        'preferences',
        'meta_data',
        'onboarding_completed',
        'onboarding_completed_at'
    ];

    /**
     * Assign the custom castable rules for each column
     * 
     * @var Array<string, string>
     */
    protected $casts = [
        'onboarding_data' => 'array',
        'preferences' => 'array',
        'meta_data' => 'array',
        'onboarding_completed' => 'boolean',
        'onboarding_completed_at' => 'datetime'
    ];

    /**
     * Get the associated user
     * 
     * @return BelongsTo<User>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Return multiple activity relationships
     * 
     * @return HasMany<Activity>
     */
    public function activities(): HasMany 
    {
        return $this->hasMany(Activity::class, 'profile_id', 'id');
    }

    /**
     * Get the specific onboarding step
     * 
     * @param $step int
     * @return ?array<string, mixed>
     */
    public function getOnboardingStep($step): ?array
    {
        return $this->onboarding_data['steps'][$step] ?? null;
    }

    /**
     * Set onboarding step
     * 
     * @param $step int
     * @param $data array
     * @return void
     */
    public function setOnboardingStep($step, $data): void
    {
        $onboarding = $this->onboarding_data ?? [];
        $onboarding['steps'][$step] = $data;
        $this->onboarding_data = $onboarding;
        $this->save();
    }
}
