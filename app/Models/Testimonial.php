<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Testimonial extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'name',
        'content',
        'locale',
        'image',
        'created_at',
        'updated_at',
    ];

    public $timestamps = true;
}
