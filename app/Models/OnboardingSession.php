<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Support\Str;
use App\Models\User;


class OnboardingSession extends Model
{
    protected $fillable = [
        'session_token',
        'user_id',
        'scenario',
        'current_step',
        'state',
        'steps_data',
        'form_data',
        'completed',
    ];

    protected $casts = [
        'steps_data' => 'array',
        'form_data' => 'array',
        'completed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the user that owns the onboarding session.
     *
     * @return BelongsTo<User>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Generating a unique session token for a onboarding process
     *
     * @return string
     */
    public static function generateToken(): string
    {
        return Str::uuid()->toString();
    }

    /**
     * find or create session for guest or authenticated user
     *
     * @param int|null $userId
     * @param string|null $token
     * @return self
     */
    public static function findOrCreateSession(?int $userId = null, ?string $token = null): self
    {

        if ( ! $token ) {
            return self::create([
                'session_token' => self::generateToken(),
                'user_id' => ($userId) ? $userId : null,
                'completed' => false,
                'steps_data' => [],
                'form_data' => [],
                'current_step' => 'welcome',
            ]);
        }

        return self::findByToken($token);
    }

    /**
     * link session to authenticated user
     *
     * @return void
     */
    public function linkToUser(int $userId): void
    {
        $this->update(['user_id' => $userId]);
    }

    /**
     * Find session by user ID and token
     *
     * @param int|null $userId
     * @param string|null $token
     * @return self
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public static function findWhen(?int $userId, ?string $token): self
    {
        return self::where('session_token', $token)
            ->when($userId, fn($q) => $q->where('user_id', $userId))
            ->firstOrFail();
    }

    /**
     * find session by session token
     *
     * @param string $token
     * @return OnboardingSession
     */
    public static function findByToken(string $token): self {
        return self::where('session_token', $token)->firstOrFail();
    }

    /**
     * mark onboarding as completed
     *
     * @return void
     */
    public function markAsCompleted(): void
    {
        $this->completed = true;
        $this->completed_at = now();
        $this->save();
    }
}