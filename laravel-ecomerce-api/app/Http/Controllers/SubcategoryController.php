<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subcategory;


class SubcategoryController extends Controller
{
    //
    public function index()
    {
        $subcategory =  Subcategory::with('article')->get();
       
        return response()->json($subcategory, 200);
    }

    public function show($id)

    {
       
        $subcategory = Subcategory::with('article')->find($id);
        // $article->subcategory = Article::find($id)->subcategory;
        // $article->subcategory->subcategories_id = Subcategory::find($article->subcategory->subcategories_id)->category;
        // $article->category = Subcategory::find($article->subcategory->categories_id)->category;
        return response()->json($subcategory, 200);

    }

    

    // /**
    //  * Store a newly created resource in storage.
    //  */
    public function store(Request $request)

    {

        // dd($request);
        // return response()->json($request->input(), 200);
        $subcategory = Subcategory::create($request->all());

        return response()->json($subcategory, 200);

    }

// delete a resource 
    public function destroy( $id)

    {
        return Subcategory::destroy($id);
    }
}
