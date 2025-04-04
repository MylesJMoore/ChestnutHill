<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        $users = User::where('name', 'like', "%$query%")
                    ->orWhere('email', 'like', "%$query%")
                    ->select('id', 'name', 'email', 'avatar_path')
                    ->get();

        return response()->json($users);
    }
}
