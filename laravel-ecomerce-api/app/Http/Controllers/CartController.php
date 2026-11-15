<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function getUserCart(Request $request)
    {
        // Ici, je récupère le cart de l'utilisateur et les informations de tous les articles qui sont dans le cart
        $cart = Cart::with('article')->where('users_id', $request->input('userID'))->get();

        // Si le cart n'existe pas, je ne renvoie un message d'erreur
        if (!$cart) {
            return response()->json([
                'message' => 'Cart not found'
            ], 404);
        }
        // Si le cart existe, je le renvoie au front
        else
        {
            return response()->json([
                'message' => 'Cart found',
                'cart' => $cart
            ], 200);
        }
    }
}
