<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class InteractionSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $posts = Post::all();

        foreach ($users as $user) {
            // Randomly like 3–6 posts
            $likedPosts = $posts->random(rand(3, 6));
            foreach ($likedPosts as $post) {
                $post->likes()->create(['user_id' => $user->id]);
            }

            // Randomly save 2–5 posts
            $savedPosts = $posts->random(rand(2, 5));
            $user->savedPosts()->attach($savedPosts->pluck('id')->toArray());
        }
    }
}
