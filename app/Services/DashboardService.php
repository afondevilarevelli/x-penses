<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;


class DashboardService
{
    public static function getDashboardData()
    {
        return [
            "balance" => self::getBalance(),
            "incomesBalance" => self::getIncomesBalance(),
            "expensesBalance" => self::getExpensesBalance()
        ];
    }

    private static function getBalance()
    {
        $amount = DB::table('accounts')->where('accounts.user_id', auth()->id())
            ->join('transactions', 'accounts.id', 'transactions.account_id')
            ->selectRaw(
                "SUM(CASE WHEN type = 'INCOME' THEN transactions.amount ELSE -1*transactions.amount END) AS amount"
            )
            ->where('date', '<=', now())
            ->groupBy('accounts.user_id')->first();

        if (!$amount)
            return 0.;

        return (float) $amount->amount;
    }

    private static function getIncomesBalance()
    {
        $amount = DB::table('accounts')->where('accounts.user_id', auth()->id())
            ->join('transactions', 'accounts.id', 'transactions.account_id')
            ->selectRaw(
                "SUM(transactions.amount) AS amount"
            )
            ->where('date', '<=', now())
            ->where('type', 'INCOME')
            ->groupBy('accounts.user_id')->first();

        if (!$amount)
            return 0.;

        return (float) $amount->amount;
    }

    private static function getExpensesBalance()
    {
        $amount = DB::table('accounts')->where('accounts.user_id', auth()->id())
            ->join('transactions', 'accounts.id', 'transactions.account_id')
            ->selectRaw(
                "SUM(transactions.amount) AS amount"
            )
            ->where('date', '<=', now())
            ->where('type', 'EXPENSE')
            ->groupBy('accounts.user_id')->first();

        if (!$amount)
            return 0.;

        return (float) $amount->amount;
    }
}