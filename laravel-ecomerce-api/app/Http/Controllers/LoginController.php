<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login_checker(Request $request)
    {
        // Valider la requête
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Récupérer l'utilisateur en utilisant son email
        $user = User::where('email', $request->email)->first();
        Log::info('User found: ', ['user' => $user]);


        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                function generateToken($length = 60) {
                    if(function_exists('random_bytes')) {
                        return bin2hex(random_bytes($length));
                    } else if(function_exists('openssl_random_pseudo_bytes')) {
                        return bin2hex(openssl_random_pseudo_bytes($length));
                    } else {
                        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        $charactersLength = strlen($characters);
                        $randomString = '';
                        for ($i = 0; $i < $length; $i++) {
                            $randomString .= $characters[rand(0, $charactersLength - 1)];
                        }
                        return $randomString;
                    }
                }
                
                $token = generateToken();
                
                // Mettre à jour le token de l'utilisateur 
                $user->update([
                    'api_token' => $token
                ]);

                return response()->json(['message' => 'Login successful', 'token' => $token, 'isAdmin' => $user->admin ? true : false , 'user' => $user], 200);

            }
            else {
                return response()->json(['message' => 'Invalid password'], 401);
            }
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}