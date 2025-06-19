<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;


class SavePostController extends Controller
{
    public function toggleSave($postId)
    {
        $user = Auth::user();
        $post = Post::findOrFail($postId);

        $alreadySaved = $user->savedPosts()->where('post_id', $postId)->exists();

        if ($alreadySaved) {
            $user->savedPosts()->detach($postId);
            return response()->json(['message' => 'Post unsaved']);
        } else {
            $user->savedPosts()->attach($postId);
            return response()->json(['message' => 'Post saved']);
        }
    }

    public function savedPosts()
    {
        $user = Auth::user();
        $posts = $user->savedPosts()
            ->with(['user:id,name,avatar_path', 'likes', 'savedByUsers'])
            ->withCount('likes')
            ->latest()
            ->get();

        $posts->transform(function ($post) use ($user) {
            $post->is_liked = $post->likes->contains('user_id', $user->id);
            $post->is_saved = $post->savedByUsers->contains($user->id);
            return $post;
        });

        return response()->json($posts);
    }
}