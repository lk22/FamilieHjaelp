<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
