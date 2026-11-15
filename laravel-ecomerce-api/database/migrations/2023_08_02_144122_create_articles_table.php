<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('subcategories_id')->index('subcategories_id');
            $table->integer('stock');
            $table->string('title');
            $table->longText('image')->nullable();
            $table->string('price');
            $table->json('spec')->nullable();
            $table->string('short_description', 35)->nullable();
            $table->longText('description')->nullable();
            $table->integer('popularity')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
};
