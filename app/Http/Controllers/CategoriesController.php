<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoriesController extends Controller
{
    public function index()
    {
        $user_and_public_categories = Auth::user()->getAllCategories();

        session()->flash("warning", "Some alert message");

        return inertia('Categories/Index', [
            "categories" => $user_and_public_categories
        ]);
    }

    public function create()
    {

        return redirect(route('categories.index'));
    }

    public function update()
    {

        return redirect(route('categories.index'));
    }
}