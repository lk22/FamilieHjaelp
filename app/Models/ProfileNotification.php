<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileNotification extends Model
{
    protected $fillable = [
        'user_id',
        'message',
        'is_read',
        'notification_type'
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'notification_type' => 'string'
    ];

    protected $hidden = [
        'user_id'
    ];

    protected $guarded = [
        'user_id'
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
