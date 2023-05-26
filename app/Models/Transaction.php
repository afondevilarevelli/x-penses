<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        // "account_id",
        // "credit_card_id",
        // "category_id",
    ];
}