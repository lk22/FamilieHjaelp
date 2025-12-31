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
        // if user is authenticated, find by user_id
        if ($userId) {
            return self::firstOrCreate(
                ['user_id' => $userId, 'completed' => false],
                ['session_token' => self::generateToken()]
            );
        }

        // if guest with existing token, find by token
        if ($token) {
            $session = self::where('session_token', $token)
            ->whereNull('user_id')
            ->where('completed', false)
            ->first();

            if ($session) {
                return $session;
            }
        }

        // create new session for guest
        return self::create([
            'session_token' => self::generateToken(),
        ]);
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
     * @return self|null
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public static function findWhen(?int $userId, ?string $token): ?self
    {
        return self::where('session_token', $token)
            ->when($userId, fn($q) => $q->where('user_id', $userId))
            ->firstOrFail();
    }

    /**
     * find session by session token
     *
     * @params string $token
     * @return OnboardingSession
     */
    public static function findByToken(string $token) {
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