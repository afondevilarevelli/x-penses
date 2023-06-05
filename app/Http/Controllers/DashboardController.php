<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;

class DashboardController extends Controller
{
    public function index()
    {
        $data = DashboardService::getDashboardData();
        return inertia('Dashboard', $data);
    }
}