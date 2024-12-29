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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->string('invoice');
            $table->bigInteger('cash');
            $table->bigInteger('change');
            $table->bigInteger('discount');
            $table->bigInteger('tax')->nullable();
            $table->bigInteger('grand_total');
            $table->integer('created_by');
            $table->integer('updated_by')->nullable();
            $table->unsignedBigInteger('shop_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
