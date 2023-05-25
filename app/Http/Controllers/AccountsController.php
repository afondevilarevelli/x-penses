<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AccountsController extends Controller
{
    public function index(){
        return inertia('Accounts', [
            "accounts" => ['account 1', 'account 2', 'account 3']
        ]);
    }
}
