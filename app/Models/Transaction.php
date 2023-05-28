<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        "amount",
        "description",
        "type",
        "date",
        "notes",
        "currency",
        "account_id",
        "credit_card_id",
        "category_id",
    ];

    public function creditCard(): HasOne
    {
        return $this->hasOne(CreditCard::class);
    }

    public function account(): HasOne
    {
        return $this->hasOne(Account::class);
    }

    public function category(): HasOne
    {
        return $this->hasOne(Category::class);
    }
}