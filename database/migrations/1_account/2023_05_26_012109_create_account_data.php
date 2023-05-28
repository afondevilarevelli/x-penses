<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('banks', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('image', 150)->nullable();
        });

        Schema::create('credit_card_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('image', 150)->nullable();
        });

        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('color', 30)->nullable();

            $table->foreignId('bank_id')->constrained('banks')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        });

        Schema::create('credit_cards', function (Blueprint $table) {
            $table->id();
            $table->string('description', 100);
            $table->string('color', 30)->nullable();
            $table->unsignedTinyInteger('close_day');
            $table->unsignedTinyInteger('expire_day');
            $table->unsignedDecimal('limit', 10);

            $table->foreignId('type_id')->constrained('credit_card_types')->onDelete('cascade');
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_cards');
        Schema::dropIfExists('accounts');
        Schema::dropIfExists('banks');
        Schema::dropIfExists('credit_card_types');
    }
};