<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Post;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('locale')->default('da');
            $table->timestamps();
        });

        Schema::create('category_post', function (Blueprint $table) {
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('category_post', function (Blueprint $table) {
            $table->dropForeign(['post_id']);
            $table->dropForeign(['category_id']);
        });
        Schema::dropIfExists('category_post');
        Schema::dropIfExists('categories');
    }
};
