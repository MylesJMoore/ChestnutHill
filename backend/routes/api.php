<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\SavePostController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FollowController;

// Public Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/posts/{id}', [PostController::class, 'show']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Profile
    Route::get('/profile', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/profile/avatar', [AuthController::class, 'uploadAvatar']);

    // Posts
    Route::get('/posts/search', [PostController::class, 'search']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
    Route::put('/posts/{id}/hide', [PostController::class, 'hide']);
    Route::put('/posts/{id}/unhide', [PostController::class, 'unhide']);

    // Comments
    Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

    // Likes
    Route::post('/posts/{id}/like', [LikeController::class, 'store']);
    Route::delete('/posts/{id}/like', [LikeController::class, 'destroy']);

    // Saved Posts
    Route::post('/posts/{id}/save', [SavePostController::class, 'toggleSave']);
    Route::get('/saved-posts', [SavePostController::class, 'savedPosts']);

    // User & Post Search
    Route::get('/users/search', [UserController::class, 'search']);

    // Feed
    Route::get('/feed', [FeedController::class, 'getFeed']);

    // Follow/Unfollow Users
    Route::post('/users/{id}/follow', [FollowController::class, 'follow']);
    Route::delete('/users/{id}/unfollow', [FollowController::class, 'unfollow']);
    Route::post('/users/{id}/toggle-follow', [FollowController::class, 'toggleFollow']);
});