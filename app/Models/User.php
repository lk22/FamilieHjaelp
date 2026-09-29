<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'has_completed_onboarding',
        'is_verified',
        'notes_count',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }

    /**
     * Determine whether the user can access the given Filament panel.
     * Only administrators may access the admin panel.
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->is_admin;
    }

    /**
     * Check if the user has completed onboarding.
     */
    public function isOnboarded(): bool
    {
        return $this->has_completed_onboarding ?? false;
    }

    /**
     * Get todos associated with the user.
     *
     * @return HasMany<Todo>
     */
    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class);
    }

    /**
     * Get the pages associated with the user.
     *
     * @return HasMany<Page>
     */
    public function pages()
    {
        return $this->hasMany(Page::class, 'user_id', 'id', 'pages');
    }

    /**
     * get the profile associated with the user
     *
     * @return HasOne<Profile>
     */
    public function profile()
    {
        $this->hasOne(Profile::class, 'user_id', 'id');
    }

    /**
     * Get the notifications associated with the user.
     *
     * @return HasMany<ProfileNotification>
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(ProfileNotification::class, 'user_id', 'id', 'notifications');
    }

    /**
     * Get the count of unread notifications for the user.
     */
    public function unreadNotificationsCount(): int
    {
        return $this->notifications()->where('is_read', false)->count();
    }

    /**
     * Get the read notifications associated with the user.
     *
     * @return HasMany<ProfileNotification>
     */
    public function readNotifications(): HasMany
    {
        return $this->notifications()->where('is_read', true);
    }

    /**
     * Get the notes associated with the user.
     *
     * @return HasMany<Note>
     */
    public function notes(): HasMany
    {
        return $this->hasMany(Note::class, 'user_id', 'id', 'notes');
    }

    /**
     * Get the onboarding session associated with the user.
     *
     * @return HasOne<OnboardingSession>
     */
    public function onboardingSession(): HasOne
    {
        return $this->hasOne(OnboardingSession::class, 'user_id', 'id');
    }
}
