<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class LoginController extends Controller
{
    //
    public function authenticate(Request $r) {

        // return response()->json($r->session()->all());
        // $this->res(0,'success');
        $credentials = $r->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('email',$r->email)
                    // ->where('password',bcrypt($r->password))
                    ->where('password',$r->password)
                    ->first();

        if(!$user){
            return response()->json(['status' => 1,"message" => "Wrong email or password"]);
        }

        $r->session()->regenerate();
        $r->session()->put('id', $user->id);
        return response()->json(['status' => 0, "message" => "Login Success"]);

        // return response()->json(['status' => 0]);

        // if(Auth::attemp($credentials)){
        //     $request->session()->regenerate();
        //     $request->session()->put('id', 'asd');
        //     return response()->json(['status' => 0]);
        // } else {
        //     return response()->json(['status' => 1]);
        //     // $this->res(1,'Email or Password cannot be blank');
        // }
    }
}
