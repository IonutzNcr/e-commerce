<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Stripe\Stripe;
use Stripe\Customer;
use Exception;

class RegisterController extends Controller
{
    public function registerMaker(Request $request)
    {
        Log::info('registerMaker request data: ', $request->all());

        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'zipcode' => 'required|string|max:10',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        try {

            Stripe::setApiKey(config('services.stripe.secret'));

            $stripeCustomer = Customer::create([
                'email' => $request->email,
                'name' => $request->firstname,
            ]);

            $user = User::create([
                'email' => $request->email,
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,               
                'password' => Hash::make($request->password),
                'admin' => false,
                'api_token' => null,
                'strip_id' => $stripeCustomer->id,
            ]);
           
            $user->adresses()->create([
                   'user_id' => $user->id, 
                    'adress' => $request->address,
                    'zipcode' => $request->zipcode,
                    'city' => $request->city,
                    'country' => $request->country
            ]);

            if (!$user) {
                return response()->json([
                    'message' => 'Registration failed!'
                ], 409);
            }

            return response()->json([
                'message' => 'Successfully created user !',
                'user' => $user
            ], 201);
        } catch (Exception $e) {
            Log::error('RegisterMaker Error', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Registration failed!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
