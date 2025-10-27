<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileNotification extends Model
{
    protected $fillable = [
        'profile_id',
        'message',
        'is_read',
    ];
}
