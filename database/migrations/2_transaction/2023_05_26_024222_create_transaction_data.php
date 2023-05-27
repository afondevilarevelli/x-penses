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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('color', 30)->nullable();
            $table->string('icon', 50)->nullable();

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedDecimal('amount', 10);
            $table->string('description', 100)->nullable();
            $table->enum('type', ["INGRESS", "EGRESS", "CREDIT_CARD_EXPENSE"]);
            $table->date('date');
            $table->string('notes', 100)->nullable();
            $table->string('currency', 15);

            $table->foreignId('account_id')->nullable()->constrained('accounts')->onDelete('cascade');
            $table->foreignId('credit_card_id')->nullable()->constrained('credit_cards')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('categories');
    }
};