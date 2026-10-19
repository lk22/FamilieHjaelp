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
        Schema::create('family_children', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->unsignedBigInteger('family_id');
            $table->string('name');
            $table->integer('age_year');
            $table->integer('age_months');
            $table->integer('age_weeks');
            $table->boolean('needs_user_access');
            $table->string('child_email')->unique();
            $table->softDeletes();
            // TODO figure out if more fields is required
            // TODO run migration - php artisan migrate
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_children');
    }
};
