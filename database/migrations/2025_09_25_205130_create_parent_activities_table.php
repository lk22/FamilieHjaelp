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
        Schema::create('parent_activities', function (Blueprint $table) {
            $table->id();
            $table->string('locale')->default('da');
            $table->string('title')->default('new activity');
            $table->text('description');
            $table->date('activity_date');
            $table->boolean('is_completed')->default(false);
            $table->timestamps();
        });

        Schema::table('parent_activities', function(Blueprint $table) {
            $table->foreignId('family_member_id')->references('id')->on('family_members')->constrained()->onDelete('cascade');
            $table->foreignId('attached_family_member_id')->references('id')->on('family_members')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parent_activities');
    }
};
