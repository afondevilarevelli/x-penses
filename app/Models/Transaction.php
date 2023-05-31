<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        "amount",
        "description",
        "type",
        "date",
        "notes",
        "currency",
        "account_id",
        "category_id",
    ];

    public function account(): HasOne
    {
        return $this->hasOne(Account::class);
    }

    public function category(): HasOne
    {
        return $this->hasOne(Category::class);
    }
}