<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class FeedController extends Controller
{
    public function getFeed()
    {
        $user = Auth::user();

        $followingIds = $user->following()->pluck('users.id');

        $posts = Post::with(['user:id,name,avatar_path', 'comments'])
                    ->whereIn('user_id', $followingIds)
                    ->latest()
                    ->get();

        return response()->json($posts);
    }
}