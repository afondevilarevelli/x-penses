<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CreditCardsController extends Controller
{
    public function index(){
        return inertia('CreditCards', [
            "creditCards" => ["card 1", "card 2", "card 3"]
        ]);
    }
}
