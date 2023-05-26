<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditCard extends Model
{
    use HasFactory;

    protected $fillable = [
        "description",
        "color",
        "close_day",
        "expire_day",
        "limit",
        // "type_id",
        // "account_id"
    ];
}