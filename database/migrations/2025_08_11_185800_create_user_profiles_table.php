<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->jsonb('onboarding_data')->nullable();
            $table->jsonb('preferences')->nullable();
            $table->jsonb('meta_data')->nullable();
            $table->jsonb('pages')->nullable();

            $table->boolean('onboarding_completed')->default(false);
            $table->datetime('onboarding_completed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('user_profile_meta', function(Blueprint $table) {
            $table->id();
            $table->foreignId('user_profile_id')->constrained('user_profiles')->onDelete('cascade');
            $table->string('key');
            $table->string('value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profile_meta');
        Schema::dropIfExists('user_profiles');
    }
};
