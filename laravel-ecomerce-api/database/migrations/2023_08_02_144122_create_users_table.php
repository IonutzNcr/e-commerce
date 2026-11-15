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
        Schema::create('users', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('email')->unique('email');
            $table->string('api_token')->nullable()->unique('api_token');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('password');
            $table->string('address')->nullable();
            $table->string('zipcode', 10)->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->dateTime('sign_in')->nullable()->useCurrent();
            $table->boolean('admin')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
