<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    public function get_users()
    {
        $users = User::all();

        // Retourner les utilisateurs en format JSON
        return response()->json($users);
    }

    public function update_user(Request $request, $user_id)
    {
        try {
            $user = User::findOrFail($user_id);
            $user->update($request->all());
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function delete_user(Request $request, $user_id)
    {
        try {
            $user = User::findOrFail($user_id);
            $user->delete();
            // suprimer les donne lier a l'utilisateur
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function togle_admin(Request $user_id)
    {
        try {
            $user = User::findOrFail($user_id);
            if($user->admin == 0) {
                $user->admin = 1;
            } else {
                $user->admin = 0;
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
