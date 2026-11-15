<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Subcategory;
use App\Models\Category;
use App\Models\Variation;
use Illuminate\Http\Request;

class ArticleController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles =  Article::with('subcategory.category')->get();
       
        return response()->json($articles, 200);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)

    {

        // dd($request);
        // return response()->json($request->input(), 200);
        $article = Article::create($request->all());

        return response()->json($article, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)

    {
       
        $article = Article::with('subcategory.category')->find($id);
        // $article->subcategory = Article::find($id)->subcategory;
        // $article->subcategory->subcategories_id = Subcategory::find($article->subcategory->subcategories_id)->category;
        // $article->category = Subcategory::find($article->subcategory->categories_id)->category;
        return response()->json($article, 200);

    }

    public function showBy($subcategoryName)
    
    {
        $articles = Article::with('subcategory.category')
        ->whereHas('subcategory', function ($query) use ($subcategoryName) {
            $query->where('name', $subcategoryName);
        })
        ->get();
        return response()->json($articles, 200);
    }

    /**
     * Display the 3 most popular articles.
     */

    public function showPopular_3()
    
        {
    
            $articles = Article::orderBy('popularity', 'desc')->take(3)->get();
    
            return response()->json($articles, 200);
        }

    /**
     * Show the form for editing the specified resource.
     */
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)

    {
        // $article = Article::findOrFail($id);

        // $article->update($request->all());

        // return response()->json($article, 200);

        try {
            // $article = Article::findOrFail($id);
            // $article->update($request->all()); // TODO comprendre ce que fait la méthode update et la méthode all()
        //    return ["blabla"=>"ok"];
            $article = Article::findOrFail($id);
            $article->update($request->all());

            return response()->json($article, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)

    {
        return Article::destroy($id);
    }

    public function getVariation($id)
    {
        $articles =  Article::with('variation')->find($id);
        return response()->json($articles, 200);
    }

    public function getAllVariation()
    {
        $articles =  Article::with('variation')->get();
        return response()->json($articles, 200);
    }

    public function storeVariation(Request $request)
    {
        // dd($request);
        // return response()->json($request->input(), 200);
        // $GetIdArticle = Article::orderBy('id', 'desc')->take(1)->get("id");
        // $idArticle = "article_id:$GetidArticle";
        // $request = (object) array_merge( (array)$request, array( 'article_id' => "$GetIdArticle"));
        // $request = json_encode($request)

        $variation = Variation::create($request->all());
        return response()->json($variation, 200);
    }

    public function updateVariation(Request $request, $id)

    {
        try {
            $variation = Variation::findOrFail($id);
            $variation->update($request->all());
            return response()->json($variation, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroyAllVariations($id)

    {
        $variation =  Variation::with('article_id')->where('article_id', $id);
        return Variation::destroy($variation); 
    }
}
