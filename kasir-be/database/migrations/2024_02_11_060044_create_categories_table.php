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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            // $table->string('image');
            $table->string('name');
            $table->text('description');
            $table->integer('group_id');
            $table->integer('user_id');
            $table->integer('updated_by')->nullable();
            $table->unsignedBigInteger('status_id');
            // $table->unsignedBigInteger('branch_id');
            $table->unsignedBigInteger('shop_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
