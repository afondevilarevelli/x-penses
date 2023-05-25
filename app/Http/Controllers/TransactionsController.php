<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    public function index(){
        return inertia('Transactions',[
            "transactions" => ["trans 1", "trans 2", "trans 3"]
        ]);
    }
}
