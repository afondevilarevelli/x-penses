<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function index(){
        return inertia('Reports', [
            "data" => ['1', '2', '3']
        ]);
    }
}
