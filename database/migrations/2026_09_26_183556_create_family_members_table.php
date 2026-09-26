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
        Schema::create('family_members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('family_id');
            $table->boolean('has_account')->default(false);
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->enum('Child', [ 'Mom', 'Dad', 'Care dad', 'Care mom']);
            $table->integer('age');
            $table->string('email')->unique(); // this is used as unique email that the users is created by
            $table->string('attached_email'); // adds support for using same email for multiple family members
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_members');
    }
};
