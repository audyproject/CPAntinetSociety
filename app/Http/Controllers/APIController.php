<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;
use Cookie;

use App\Models\User;
use App\Models\Role;
use App\Models\Token;
use App\Models\Visitor;
use App\Models\Sess;

class APIController extends Controller
{
    public function test(){

        // session::put('logged','handi');
        // dd(session::get('logged'));
        // session::has('logged');
        
            if(Session::has('logged')){
                echo('ada');
            } else{
                echo('gada');
            }
        
        // session::flush(); // delete
        // session::forget('logged'); // ilangin 1
        // session::regenerate(); //regenerate token
    }

    public function checkSession(){
        if(Session::has('logged')){
            $this->res(0,'Success');
        } else{
            $this->res(1,'No Session');
        }
    }

    public function res($status='',$message='',$token = '',$data=''){
        return response()->json([
            'status'  => $status,
            'message' => $message,
            'token'   => $token,
            'data'    => $data,
        ]);
    }

    public function login(request $r){
        
        //validasi
        if(!$r->email || !$r->password){
            $this->res(1,'Email or Password cannot be blank');
        }

        $user = User::where('email',$r->email)
                    ->where('password',Hash::make($r->password))
                    ->first();

        if(!$user){
            return $this->res(1,'Wrong Email or Password!');
        } 
        else if(! Hash::check($r->password, $user->password))
        {
            return $this->res(1,'Wrong Email or Password!');
        }

        

        //visitor log
        $visitor = new Visitor();
        $visitor->ip = $r->ip();
        $visitor->save();

        //res
        Session::put('logged',$user->username);
        return $this->res(0,'Login Success');
    
    }

    public function logout(request $r){
        if(Session::has('logged')){
            Session::forget('logged');
            return $this->res(0,'Logout Success');
        } else{
            return $this->res(1,'Has not logged yet');
        }
    }
    

}
