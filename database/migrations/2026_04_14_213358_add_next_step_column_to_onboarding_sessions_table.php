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
        Schema::table('onboarding_sessions', function (Blueprint $table) {
            $table->string('next_step')->nullable()->after('current_step');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('onboarding_sessions', function (Blueprint $table) {
            $table->dropColumn('next_step');
        });
    }
};
