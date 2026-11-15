<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories =  Category::with('subcategory.article')->get();
       
        return response()->json($categories, 200);
    }

    

    // /**
    //  * Store a newly created resource in storage.
    //  */
    public function store(Request $request)

    {

        // dd($request);
        // return response()->json($request->input(), 200);
        $category = Category::create($request->all());

        return response()->json($category, 200);

    }

    public function show($id)

    {
       
        $article = Category::with('subcategory.article')->find($id);
        // $article->subcategory = Article::find($id)->subcategory;
        // $article->subcategory->subcategories_id = Subcategory::find($article->subcategory->subcategories_id)->category;
        // $article->category = Subcategory::find($article->subcategory->categories_id)->category;
        return response()->json($article, 200);

    }

// delete a resource 
    public function destroy( $id)

    {
        return Category::destroy($id);
    }
}
