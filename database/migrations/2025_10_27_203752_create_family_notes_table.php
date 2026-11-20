<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('family_notes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('family_member_id')->nullable();
            $table->boolean('is_important')->default(false);
            $table->string('title')->default('new note');
            $table->text('note_content');
            $table->string('locale')->default('da');
            $table->string('type')->default('general');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('family_notes', function (Blueprint $table) {
            $table->dropColumnIfExists('user_id');
            $table->dropColumnIfExists('family_member_id');
        });

        Schema::dropIfExists('family_notes');
    }
};
