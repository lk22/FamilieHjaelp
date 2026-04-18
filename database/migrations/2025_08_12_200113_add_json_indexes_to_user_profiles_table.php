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
        Schema::table('user_profiles', function (Blueprint $table) {
            // DB::statement("CREATE INDEX user_profiles_onboarding_data_completed_idx ON user_profiles USING BTREE ((onboarding_data->>'completed'))");
            // DB::statement("CREATE INDEX user_profiles_preferences_notifications_idx ON user_profiles USING BTREE ((preferences->>'notifications'))");
            // DB::statement("CREATE INDEX user_profiles_meta_data_idx ON user_profiles USING BTREE ((meta_data))");
            // DB::statement("CREATE INDEX user_profiles_pages_idx ON user_profiles USING BTREE ((pages))");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_profiles', function (Blueprint $table) {
            // DB::statement("DROP INDEX IF EXISTS user_profiles_onboarding_data_completed_idx");
            // DB::statement("DROP INDEX IF EXISTS user_profiles_preferences_notifications_idx");
            // DB::statement("DROP INDEX IF EXISTS user_profiles_meta_data_idx");
            // DB::statement("DROP INDEX IF EXISTS user_profiles_pages_idx");
        });
    }
};
