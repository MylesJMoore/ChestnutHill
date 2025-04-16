<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function store($postId)
    {
        $post = Post::findOrFail($postId);

        // Prevent duplicate likes
        if ($post->likes()->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'Already liked'], 400);
        }

        $like = new Like([
            'user_id' => Auth::id(),
            'post_id' => $post->id,
        ]);

        $like->save();

        return response()->json(['message' => 'Liked']);
    }

    public function destroy($postId)
    {
        $post = Post::findOrFail($postId);

        $like = $post->likes()->where('user_id', Auth::id())->first();

        if (!$like) {
            return response()->json(['message' => 'Like not found'], 404);
        }

        $like->delete();

        return response()->json(['message' => 'Unliked']);
    }
}
