<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Role;
use App\Models\Token;

class APIController extends Controller
{
    public function test(){
        // $token = str::random(23);
        // $ins = new Token();
        // $ins->token = $token;
        // $ins->users_id = 1;
        // $ins->save();
        dd('success');
    }

    function res($status,$message,$token){
        if($token){
            $data =[
                'status'=>$status,
                'message'=>$message,
                'token'=>$token,
                 ];
        } else{
            $data =[
                'status'=>$status,
                'message'=>$message,
                 ];
        }

        return $data->json();
    }

    public function login(request $r){
        
        //validasi
        if(!$r->email || !$r->password){
            $this->res(1,'Email or Password cannot be blank');
        }

        $user = User::where('email',$r->email)
                    ->where('password',bcrypt($r->password))
                    ->first();

        if(!$user){
            $this->res(1,'Wrong Email or Password!');
        }

        //token generate
        $token = str::random(23);
        $ins = new Token();
        $ins->token = $token;
        $ins->users_id = $user->id;
        $ins->save();

        //res
        return $this->res(0,'Login Success',$token);
    
    }
}