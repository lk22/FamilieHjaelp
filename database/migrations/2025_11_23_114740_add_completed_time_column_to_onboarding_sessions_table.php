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
        Schema::table('onboarding_sessions', function (Blueprint $table) {
            $table->timestamp('completed_at')->nullable()->after('completed');
        });

        DB::table('onboarding_sessions')
                ->where('completed', true)
                ->whereNull('completed_at')
                ->update(['completed_at' => DB::raw('COALESCE(updated_at, NOW())')]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('onboarding_sessions', function (Blueprint $table) {
            $table->dropColumn('completed_at');
        });
    }
};
