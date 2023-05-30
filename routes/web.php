<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\CreditCardsController;
use App\Http\Controllers\ReportsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::check())
        return to_route('dashboard');

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('accounts', AccountsController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('/accounts/{id}/projection', [AccountsController::class, 'projection'])->name('accounts.projection');

    Route::resource('transactions', TransactionsController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('transactions/incomes', [TransactionsController::class, 'incomes'])->name('transactions.incomes.index');
    Route::get('transactions/expenses', [TransactionsController::class, 'expenses'])->name('transactions.expenses.index');

    Route::get('/credit-cards', [CreditCardsController::class, 'index'])->name('credit-cards.index');

    Route::get('/reports', [ReportsController::class, 'index'])->name('reports.index');

    Route::resource('categories', CategoriesController::class)->only(['index', 'store', 'update', 'destroy']);
});

require __DIR__ . '/auth.php';