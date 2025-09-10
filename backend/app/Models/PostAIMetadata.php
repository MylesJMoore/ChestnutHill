<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostAIMetadata extends Model
{
    protected $table = 'post_ai_metadata';
    protected $guarded = [];

    protected $casts = [
        'keywords_json' => 'array',
        'hashtags_json' => 'array',
        'generated_at'  => 'datetime',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
