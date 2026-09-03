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
        'user_id',
    ];

    protected $appends = ['featured_image_url'];

    /**
     *
     * @return array{content: string, excerpt: string}
     */
    protected function casts(): array {
        // return ['excerpt' => 'array', 'content' => 'array'];
        return [];
    }

    protected $with = ['categories', 'tags'];
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    protected function featuredImageUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->featured_image ? Storage::url($this->featured_image) : null
        );
    }
}
