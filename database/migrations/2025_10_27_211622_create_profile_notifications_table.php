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
        Schema::create('profile_notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('profile_id');
            $table->string('notification_type');
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropColumnIfExists('profile_id');
        Schema::dropIfExists('profile_notifications');
    }
};
