<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPostIdToCommentsTable extends Migration
{
    public function up()
{
    Schema::table('comments', function (Blueprint $table) {
        $table->foreignId('post_id')->constrained()->onDelete('cascade');
    });
}

public function down()
{
    Schema::table('comments', function (Blueprint $table) {
        $table->dropForeign(['post_id']);
        $table->dropColumn('post_id');
    });
}
}
