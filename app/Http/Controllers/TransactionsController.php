<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transactions\CreateTransactionRequest;
use App\Http\Requests\Transactions\EditTransactionRequest;
use App\Models\Transaction;
use Exception;

class TransactionsController extends Controller
{
    public function index()
    {
        $user_transactions = auth()->user()->getTransactions();

        return inertia('Transactions/Index', [
            "transactions" => $user_transactions,
        ]);
    }

    public function incomes()
    {
        $user_transactions = auth()->user()->getTransactions('INCOME');

        return inertia('Transactions/Index', [
            "transactions" => $user_transactions,
        ]);
    }

    public function expenses()
    {
        $user_transactions = auth()->user()->getTransactions('EXPENSE');

        return inertia('Transactions/Index', [
            "transactions" => $user_transactions
        ]);
    }

    public function store(CreateTransactionRequest $request)
    {
        $validated = $request->validated();

        try {
            Transaction::insert($validated);
            session()->flash("success", "Transaction created succesfully");
        } catch (Exception $e) {
            session()->flash("error", $e); //"Error while creating transaction");
        }

        return redirect()->back();
    }

    public function update(EditTransactionRequest $request, Transaction $transaction)
    {
        try {
            $validated = $request->validated();
            $transaction->update($validated);
            session()->flash("success", "Transaction updated succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while updating transaction");
        }

        return redirect(route('transactions.index'));
    }

    public function destroy($id)
    {
        $transaction = Transaction::join('accounts', 'accounts.id', 'transactions.account_id')
            ->where('transactions.id', $id)
            ->where('accounts.user_id', auth()->user()->id)->first();

        abort_if(!$transaction, 403);

        try {
            $transaction->delete();
            session()->flash("success", "Transaction deleted succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while deleting transaction");
        }

        return redirect(route('transactions.index'));
    }
}