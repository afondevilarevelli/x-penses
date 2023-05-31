<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "color",
        "bank_id",
        "user_id"
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function bank(): HasOne
    {
        return $this->hasOne(Bank::class);
    }

    public function getAmount()
    {
        $amount = DB::table('accounts')->where('accounts.id', $this->id)
            ->join('transactions', 'accounts.id', '=', 'transactions.account_id')
            ->selectRaw(
                "SUM(CASE WHEN type = 'INCOME' THEN transactions.amount ELSE -1*transactions.amount END) AS amount"
            )
            ->where('date', '<=', now())
            ->groupBy('accounts.id')->first();

        if (!$amount)
            return 0.;

        return (float) $amount->amount;
    }
}