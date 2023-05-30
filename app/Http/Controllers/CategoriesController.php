<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categories\CreateCategoryRequest;
use App\Http\Requests\Categories\EditCategoryRequest;
use App\Models\Category;
use Exception;

class CategoriesController extends Controller
{
    public function index()
    {
        $user_categories = auth()->user()->categories()->get();

        return inertia('Categories/Index', [
            "categories" => $user_categories
        ]);
    }

    public function store(CreateCategoryRequest $request)
    {
        $validated = $request->validated();

        try {
            Category::insert([...$validated, 'user_id' => auth()->user()->id]);
            session()->flash("success", "Category '" . $validated['name'] . "' created succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while creating category '" . $validated['name']);
        }

        return redirect(route('categories.index'));
    }

    public function update(EditCategoryRequest $request, Category $category)
    {
        try {
            $validated = $request->validated();
            $category->update($validated);
            session()->flash("success", "Category '" . $validated['name'] . "' updated succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while updating category '" . $category['name'] . "'");
        }

        return redirect(route('categories.index'));
    }

    public function destroy($id)
    {
        $category = Category::where('id', $id)->where('user_id', auth()->user()->id)->first();

        abort_if(!$category, 403);

        $name = $category->name;

        try {
            $category->delete();
            session()->flash("success", "Category '" . $name . "' deleted succesfully");
        } catch (Exception $e) {
            session()->flash("error", "Error while deleting category '" . $name . "'");
        }

        return redirect(route('categories.index'));
    }
}