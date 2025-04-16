<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFollowerAndFollowedToFollowsTable extends Migration
{
    public function up(): void
    {
        Schema::table('follows', function (Blueprint $table) {
            $table->unsignedBigInteger('follower_id')->after('id');
            $table->unsignedBigInteger('followed_user_id')->after('follower_id');

            $table->foreign('follower_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('followed_user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('follows', function (Blueprint $table) {
            $table->dropForeign(['follower_id']);
            $table->dropForeign(['followed_user_id']);
            $table->dropColumn(['follower_id', 'followed_user_id']);
        });
    }
}
