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
            "expensesBalance" => self::getExpensesBalance(),
            "expensesByCategory" => self::getExpensesByCategory(),
            "incomesByCategory" => self::getIncomesByCategory(),

            "monthlyExpenses" => self::getCurrentMonthlyBalance("EXPENSE"),
            "monthlyIncomes" => self::getCurrentMonthlyBalance("INCOME")
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

    private static function getExpensesByCategory()
    {
        return DB::table('accounts')->where('accounts.user_id', auth()->id())
            ->join('transactions', 'accounts.id', 'transactions.account_id')
            ->selectRaw(
                "transactions.category_id, " .
                "SUM(transactions.amount) AS amount"
            )
            ->where('type', 'EXPENSE')
            ->where('date', '<=', now())
            ->groupBy('transactions.category_id')->get();
    }
    private static function getIncomesByCategory()
    {
        return DB::table('accounts')->where('accounts.user_id', auth()->id())
            ->join('transactions', 'accounts.id', 'transactions.account_id')
            ->selectRaw(
                "transactions.category_id, " .
                "SUM(transactions.amount) AS amount"
            )
            ->where('type', 'INCOME')
            ->where('date', '<=', now())
            ->groupBy('transactions.category_id')->get();
    }

    private static function getCurrentMonthlyBalance($type = null)
    {

        $query = DB::table('accounts')->where('accounts.user_id', auth()->id())
            ->join('transactions', 'accounts.id', 'transactions.account_id')
            ->selectRaw(
                "SUM(transactions.amount) AS amount"
            )
            ->whereYear('date', now()->year)
            ->whereMonth('date', now()->month);

        if ($type)
            $query = $query->where('type', $type);

        $amount = $query->groupBy('accounts.user_id')->first();

        if (!$amount)
            return 0.;

        return (float) $amount->amount;
    }

}