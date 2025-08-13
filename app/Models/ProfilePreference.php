<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Profile;

class ProfilePreference extends Model
{
    /**
     * Assign the table fields to be mass assignable
     * 
     * @var array<string>
     */
    protected $fillable = [
        'profile_id', 
        'preference_key', 
        'preference_value'
    ];

    /**
     * Assign the custom castable rules for each column
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'preference_value' => 'jsonb',
    ];

    /**
     * Assign the guarded fields
     * 
     * @var array<string>
     */
    protected $guarded = [
        'profile_id', 
        'preference_key'
    ];

    /**
     * Get the associated profile.
     * 
     * @return BelongsTo<Profile>
     */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    /**
     * Get the preference key.
     * 
     * @return string
     */
    public function getPreferenceKey(): string
    {
        return $this->preference_key;
    }

    /**
     * Get the preference value.
     * 
     * @return ?array<string, mixed>
     */
    public function getPreferenceValue(): ?array
    {
        return $this->preference_value;
    }

    /**
     * Get specific preference option
     * 
     * @param $key string
     * @param $default null
     * @return string
     */
    public function getPreference(string $key, $default = null): string
    {
        return $this->preference_value[$key] ?? $default;
    }

    /**
     * set preference option
     *
     * @param $key string
     * @param $value mixed
     */
    public function setPreference(string $key, mixed $value): void
    {
        $this->preference_value[$key] = $value;
        $this->save();
    }
}
