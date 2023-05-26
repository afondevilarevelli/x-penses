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

        return inertia('Categories', [
            "categories" => $user_and_public_categories
        ]);
    }
}