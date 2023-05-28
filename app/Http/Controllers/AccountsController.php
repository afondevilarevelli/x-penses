<?php

namespace App\Http\Controllers;

use App\Http\Requests\Accounts\CreateAccountRequest;
use App\Http\Requests\Accounts\EditAccountRequest;
use App\Models\Account;
use App\Models\Bank;
use Exception;

class AccountsController extends Controller
{
    public function index()
    {
        $user_accounts = auth()->user()->accounts()->get();

        $banks = Bank::get();

        return inertia('Accounts/Index', [
            "accounts" => $user_accounts,
            "banks" => $banks
        ]);
    }

    public function store(CreateAccountRequest $request)
    {
        $validated = $request->validated();

        try {
            Account::insert([...$validated, 'user_id' => auth()->user()->id]);
            session()->flash("success", "Account '" . $validated['name'] . "' created succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while creating account '" . $validated['name']);
        }

        return redirect(route('accounts.index'));
    }

    public function update(EditAccountRequest $request, Account $account)
    {
        try {
            $validated = $request->validated();
            $account->update($validated);
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
}