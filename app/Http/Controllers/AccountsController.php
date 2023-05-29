<?php

namespace App\Http\Controllers;

use App\Http\Requests\Accounts\CreateAccountRequest;
use App\Http\Requests\Accounts\EditAccountRequest;
use App\Models\Account;
use App\Models\Bank;
use App\Models\Transaction;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class AccountsController extends Controller
{
    public function index()
    {
        $user_accounts = auth()->user()->getAccountsWithData();

        $banks = Bank::get();

        return inertia('Accounts/Index', [
            "accounts" => $user_accounts,
            "banks" => $banks
        ]);
    }

    public function store(CreateAccountRequest $request)
    {
        $amount = $request->validated()['amount'];
        $validated = Arr::except($request->validated(), ['amount']);

        try {
            DB::beginTransaction();

            $accountCreated = new Account([...$validated, 'user_id' => auth()->user()->id]);
            $accountCreated->save();

            if ($amount != 0) {
                Transaction::insert([
                    "amount" => abs($amount),
                    "description" => 'Initial account amount',
                    "type" => $amount > 0 ? "INGRESS" : 'EGRESS',
                    "datetime" => now(),
                    "currency" => "USD",
                    "account_id" => $accountCreated->id
                ]);
            }

            session()->flash("success", "Account '" . $validated['name'] . "' created succesfully");

            DB::commit();
        } catch (Exception $e) {
            session()->flash("error", "Error while creating account '" . $validated['name']);
            DB::rollBack();
        }

        return redirect(route('accounts.index'));
    }

    public function update(EditAccountRequest $request, Account $account)
    {
        $amount = $request->validated()['amount'];
        $validated = Arr::except($request->validated(), ['amount']);

        try {
            $account->update($validated);

            $currentAmount = $account->getAmount();
            $diff = $currentAmount - $amount;

            if ($diff != 0) {
                Transaction::insert([
                    "amount" => abs($diff),
                    "description" => 'Modify account amount',
                    "type" => $amount > $currentAmount ? "INGRESS" : 'EGRESS',
                    "datetime" => now(),
                    "currency" => "USD",
                    "account_id" => $account->id
                ]);
            }

            session()->flash("success", "Account '" . $validated['name'] . "' updated succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while updating account '" . $account['name'] . "'");
        }

        return redirect(route('accounts.index'));
    }

    public function destroy($id)
    {
        $account = Account::where('id', '=', $id)->where('user_id', '=', auth()->user()->id)->first();

        if (!$account)
            return response('Unauthorized', 401);

        $name = $account->name;

        try {
            $account->delete();
            session()->flash("success", "Account '" . $name . "' deleted succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while deleting account '" . $name . "'");
        }

        return redirect(route('accounts.index'));
    }

    public function projection($id)
    {
        $user_account = auth()->user()->accounts()->findOrFail($id);

        return inertia('Accounts/Projection', [
            "account" => $user_account
        ]);
    }
}