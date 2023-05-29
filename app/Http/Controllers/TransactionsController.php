<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transactions\CreateTransactionRequest;
use App\Http\Requests\Transactions\EditTransactionRequest;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    public function index()
    {
        $user_transactions = auth()->user()->getTransactions();

        return inertia('Transactions/Index', [
            "transactions" => $user_transactions
        ]);
    }

    public function store(CreateTransactionRequest $request)
    {
        $validated = $request->validated();

        try {
            Transaction::insert([...$validated, 'user_id' => auth()->user()->id]);
            session()->flash("success", "Transaction '" . $validated['name'] . "' created succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while creating transaction '" . $validated['name']);
        }

        return redirect(route('transactions.index'));
    }

    public function update(EditTransactionRequest $request, Transaction $transaction)
    {
        try {
            $validated = $request->validated();
            $transaction->update($validated);
            session()->flash("success", "Transaction '" . $validated['name'] . "' updated succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while updating transaction '" . $transaction['name'] . "'");
        }

        return redirect(route('transaction.index'));
    }

    public function destroy($id)
    {
        $transaction = Transaction::where('id', '=', $id)->where('user_id', '=', auth()->user()->id)->first();

        if (!$transaction)
            return response('Unauthorized', 401);


        try {
            $transaction->delete();
            session()->flash("success", "Transaction deleted succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while deleting transaction");
        }

        return redirect(route('transaction.index'));
    }
}