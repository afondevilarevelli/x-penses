<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\EditCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Response;

class CategoriesController extends Controller
{
    public function index()
    {
        $user_categories = Auth::user()->categories()->get();

        return inertia('Categories/Index', [
            "categories" => $user_categories
        ]);
    }

    public function create(CreateCategoryRequest $request)
    {
        $validated = $request->validated();

        Category::create([...$validated, 'user_id' => auth()->user()->id]);

        session()->flash("success", "Category '" . $validated['name'] . "' created succesfully");

        return redirect(route('categories.index'));
    }

    public function update(EditCategoryRequest $request, Category $category)
    {
        $validated = $request->validated();

        $category->update($validated);

        session()->flash("success", "Category '" . $validated['name'] . "' updated succesfully");

        return redirect(route('categories.index'));
    }

    public function delete(Category $category)
    {
        if ($category->user_id != auth()->user()->id)
            return Response::denyWithStatus(401);

        $name = $category->name;

        $category->delete();

        session()->flash("success", "Category '" . $name . "' deleted succesfully");

        return redirect(route('categories.index'));
    }
}