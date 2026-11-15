<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function SaveOrder(Request $request)
    {
        // Ici, je récupère le cart de l'utilisateur et les informations de tous les articles qui sont dans le cart
        $cart = Cart::with('article')->where('users_id', $request->input('userID'))->get();

        // json en string
        $cart = json_encode($cart);
        // encryptage
        $cart = encrypt($cart);

        // Je crée un nouvel order
        //TODO: Prendre le panier du non user en compte (guest) et le mettre dans la table orders
        //FIXME: Il foudrais que la sauvegarde suit la table dans la db
        try{
            $order = new Order();
            $order->crypt = $cart;
            $order->etat = "En préparation";
            $order->users_id = $request->input('userID');
            $order->save();

            return response()->json([
                'message' => 'Order saved',
            ], 200);
        }  catch (\Exception $e) {
            return response()->json([
                'message' => 'Could not order',
            ], 404);
        }
    }
    
    public function getOrders($orderID)
    {
        // Je récupère tous les orders de l'utilisateur
        $orders = Order::where('users_id', $orderID)->get();

        $carts = [];
        // Je décripte les orders
        foreach ($orders as $order) {
            $order->crypt =  json_decode(decrypt($order->crypt));
        }

        
        
        return response()->json([
            'orders' => $orders,
        ], 200);
    }
}
