<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function follow($id)
    {
        $userToFollow = User::findOrFail($id);
        $user = Auth::user();

        if ($user->id === $userToFollow->id) {
            return response()->json(['error' => 'You cannot follow yourself'], 400);
        }

        if (!$user->following()->where('followed_user_id', $userToFollow->id)->exists()) {
            $user->following()->attach($userToFollow->id);
        }

        return response()->json(['message' => 'Followed successfully']);
    }

    public function unfollow($id)
    {
        $userToUnfollow = User::findOrFail($id);
        $user = Auth::user();

        $user->following()->detach($userToUnfollow->id);

        return response()->json(['message' => 'Unfollowed successfully']);
    }
}
