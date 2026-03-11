<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
    ];
    protected $guarded = ['id'];
    protected $hidden = ['created_at', 'updated_at'];
}
