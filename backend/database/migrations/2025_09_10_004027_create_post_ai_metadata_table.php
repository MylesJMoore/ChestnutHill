<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostAiMetadataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('post_ai_metadata', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->unique()->constrained()->cascadeOnDelete();

            // Core fields
            $table->string('summary', 300)->nullable();
            $table->string('language', 10)->nullable();
            $table->json('keywords_json')->nullable();   // [{text, score}]
            $table->json('hashtags_json')->nullable();   // ["#fooBar", ...]

            // Audit/provenance (we’ll fill later)
            $table->string('provider', 32)->nullable();
            $table->string('model', 64)->nullable();
            $table->unsignedInteger('prompt_version')->default(1);
            $table->unsignedInteger('tokens_prompt')->nullable();
            $table->unsignedInteger('tokens_output')->nullable();
            $table->decimal('cost_usd', 8, 4)->nullable();
            $table->decimal('confidence', 3, 2)->nullable(); // 0.00–1.00

            // Freshness + status
            $table->string('content_checksum', 64)->index(); // sha256 of title|body
            $table->enum('status', ['ok', 'skipped', 'error'])->default('ok');
            $table->timestamp('generated_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_ai_metadata');
    }
}
