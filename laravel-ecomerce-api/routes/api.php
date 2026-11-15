<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\UserController; 
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ShippingController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Exemple de route : http://127.0.0.1:8000/api/articles/popular_3

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Avoir tous les articles

Route::get('/articles',[ArticleController::class,'index']);

// Afficher les 3 produits les plus populaires
Route::get('/articles/popular_3', [ArticleController::class, 'showPopular_3']);

//Avoir un produit precis
Route::get('/articles/{id}',[ArticleController::class,'show']);

//Creer un nouvel produit
Route::post('/articles',[ArticleController::class,'store']);

// Mettre a jour un produit
Route::post('/articles/update/{id}',[ArticleController::class,'update']);

//Supprimer un produit
Route::delete('/articles/{id}',[ArticleController::class,'destroy']);

// Route pour avoir tous les utilisateurs
Route::get('/users', [UserController::class, 'get_users']);

// Route pour mettre à jour un utilisateur
Route::post('/user/update/{id}', [UserController::class, 'update_user']);

// Route pour suprimmer un utilisateur
Route::delete('/user/delete/{id}', [UserController::class, 'delete_user']);

// Route pour se connecter
Route::post('/login', [LoginController::class, 'login_checker']);

// Route pour s'incrire
Route::post('/register', [RegisterController::class, 'registerMaker']);

// Route pour récupérer le cart d'un utilisateur
Route::post('/getUserCart', [CartController::class, 'getUserCart']);

//ROute pour recuperer les categories (avec les soucategories et articles)
Route::get('/categories',[CategoryController::class, 'index']);
Route::get('/categories/{id}',[CategoryController::class, 'show']);
Route::post('/categories',[CategoryController::class, 'store']);
Route::delete('/categories/{id}',[CategoryController::class, 'destroy']);

Route::get('/subcategories',[SubcategoryController::class, 'index']);
Route::get('/subcategories/{id}',[SubcategoryController::class, 'show']);
Route::post('/subcategories',[SubcategoryController::class, 'store']);
Route::delete('/subcategories/{id}',[SubcategoryController::class, 'destroy']);

Route::get('/articles/subcategory/{categoryName}',[ArticleController::class, 'showBy']);

Route::get('/config', [PaymentController::class, 'get_config']);

Route::post('/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);

//Variations 

Route::get('/variation/{id}',[ArticleController::class, 'getVariation']);
Route::get('/variation',[ArticleController::class, 'getAllVariation']);
//Créé une variation de base d'un nouvelle article
Route::post('/variation',[ArticleController::class,'storeVariation']);
//Update la variation de base d'un article
Route::post('/variation/update/{id}',[ArticleController::class,'updateVariation']);
//Delete une variation
Route::delete('/variation/{id}',[ArticleController::class,'destroyAllVariations']);


//Frai de port 
Route::post('/shipping', [ShippingController::class, 'getFees']);
