<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Cart;
use App\Models\User;
use App\Models\Country;
use App\Models\Mode;
use App\Models\Article;
use App\Models\Variation;



class ShippingController extends Controller
{
    
    public function getFees(Request $request)
    {
        //get the user id from the request
        $user_id = $request->input('user_id');
        
        //get the user from the cart using the user_id
        $user = User::with('Adresses')->where('id', $request->input("adress_id"))->first();
       
        
        //get the user country from the user
        $country = Country::where('name', $user->adresses[0]->country)->first();
        // return response()->json($country, 200);
        
        //get the country fees 
        $fees_country = $country->fee;
       
        //get the mode from the request
        $mode = Mode::where('name', $request->mode)->first();
        //get the mode fees
        $fees_mode = $mode->fee;
        //get the weight  from the cart
        $cart = Cart::where('users_id', $user_id)->get();
        $weight = 0; 
        foreach($cart as $item) {
            
            $quantity = $item->quantity;
            $article_id = Article::find($item->articles_id)->id; //FIXME: Ici il faut que je recupere le poids depuis la variation
            $variation_weight = Variation::where('id', $item->variation_id)->first()->poid;
            $weight += $variation_weight/1000 * $quantity;
            // $weight += $article-> * $quantity;
          
        }
        //get the weight fees
        $weight *= 0.08;
        //get the total fees
        $total_fees = $fees_country + $fees_mode + $weight; 
        return response()->json($total_fees, 200);
    }


   
}
