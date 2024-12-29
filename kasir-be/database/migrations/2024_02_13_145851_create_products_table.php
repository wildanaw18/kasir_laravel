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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('unit_id');
            $table->unsignedBigInteger('size_id');
            $table->string('image');
            $table->string('barcode')->unique();
            $table->string('product_id')->unique();
            $table->string('title');
            $table->text('description');
            $table->bigInteger('buy_price');
            $table->bigInteger('sell_price');
            $table->integer('stock');
            $table->integer('user_id');
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
        Schema::dropIfExists('products');
    }
};
