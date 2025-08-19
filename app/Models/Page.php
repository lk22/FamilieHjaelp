<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Page extends Model
{
    /**
     * The table associated with the model.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'page_title',
        'description',
        'user_id',
        'category',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'page_title' => 'string',
    ];

    /**
     * The attributes that are guarded.
     *
     * @var array<string>
     */
    protected $guarded = [
        'id',
        'user_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<string>
     */
    protected $hidden = [
        'user_id'
    ];

    /**
     * Get the route key name for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get the page title attribute.
     *
     * @return string
     */
    public function getPageTitleAttribute()
    {
        return $this->attributes['page_title'] ?: $this->title;
    }
}
