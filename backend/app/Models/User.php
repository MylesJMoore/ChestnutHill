<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['name', 'email', 'password', 'bio', 'avatar_path',];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    // Users that THIS user is following
    public function following()
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'followed_user_id');
    }

    // Users that are following THIS user
    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows', 'followed_user_id', 'follower_id');
    }
    
    public function savedPosts()
    {
        return $this->belongsToMany(Post::class, 'post_user_saves')->withTimestamps();
    }

    // Optional: Append full URL
    protected $appends = ['avatar_url'];

    public function getAvatarUrlAttribute()
    {
        return $this->avatar_path
            ? url('storage/avatars/' . $this->avatar_path)
            : null;
    }
}
