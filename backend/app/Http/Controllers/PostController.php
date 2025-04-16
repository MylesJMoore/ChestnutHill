<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with([
            'user:id,name,avatar_path',
            'comments.user:id,name,avatar_path'
        ])
        ->withCount('likes')
        ->where('hidden', false)
        ->latest()
        ->get();

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:500',
            'image' => 'nullable|image|max:2048',
        ]);

        $post = new Post();
        $post->user_id = Auth::id();
        $post->content = $request->content;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $post->image = $path;
        }

        $post->save();

        return response()->json($post, 201);
    }

    public function show($id)
    {
        try {
            $post = Post::with([
                'user:id,name,avatar_path',
                'comments.user:id,name,avatar_path'
            ])
            ->withCount('likes')
            ->findOrFail($id);

            if ($post->hidden && $post->user_id !== Auth::id()) {
                return response()->json(['error' => 'Post not found.'], 404);
            }

            return response()->json($post);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Post not found.'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $post = Post::findOrFail($id);
    
            if ($post->user_id !== Auth::id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }
    
            $request->validate([
                'content' => 'required|string|max:500',
                'image' => 'nullable|image|max:2048',
            ]);
    
            $post->content = $request->content;
    
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('posts', 'public');
                $post->image = $path;
            }
    
            $post->save();
    
            return response()->json($post);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Post not found.'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $post = Post::findOrFail($id);
    
            if ($post->user_id !== Auth::id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }
    
            $post->delete();
            return response()->json(['message' => 'Post deleted']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Post not found.'], 404);
        }
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        $posts = Post::with(['user:id,name,avatar_path', 'comments'])
            ->where('hidden', false)
            ->where('content', 'like', '%' . $query . '%')
            ->latest()
            ->get();

        if ($posts->isEmpty()) {
            return response()->json([
                'message' => 'No posts found matching your query.'
            ], 200);
        }

        return response()->json($posts);
    }

    public function hide($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->hidden = true;
        $post->save();

        return response()->json(['message' => 'Post hidden']);
    }

    public function unhide($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->hidden = false;
        $post->save();

        return response()->json(['message' => 'Post unhidden']);
    }
}
