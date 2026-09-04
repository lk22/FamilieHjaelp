<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Category;
use App\Models\Tag;

class Post extends Model
{

    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'title',
        'excerpt',
        'content',
        'featured_image',
        'slug',
        'url',
        'locale',
        'user_id',
        'is_published',
        'published_at',
        'is_featured',
        'featured_at',
    ];

    protected $appends = ['featured_image_url'];

    /**
     *
     * @return array{content: string, excerpt: string}
     */
    protected function casts(): array {
        return [
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'is_featured' => 'boolean',
            'featured_at' => 'datetime',
        ];
    }

    protected $with = ['categories', 'tags'];

    /**
     * Getting post by slug field
     *
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_post', 'post_id', 'category_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id');
    }

    public function getFeatured(): ?self
    {
        return $this->is_featured ? $this : null;
    }

    protected function featuredImageUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->featured_image ? Storage::url($this->featured_image) : null
        );
    }
}
