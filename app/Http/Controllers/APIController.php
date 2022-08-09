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
        
            // if(Session::has('logged')){
            //     echo('ada');
            // } else{
            //     echo('gada');
            // }
        
        // session::flush(); // delete
        // session::forget('logged'); // ilangin 1
        // session::regenerate(); //regenerate token
    }

    public function checkSession(){
        if(Session::has('logged')){
            Session::regenerate();
            return $this->res(0,'Success');
        } else{
            return $this->res(1,'No Session');
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
                    ->first();

        if(!$user){
            return $this->res(1,'Wrong Email or Password!');
        } 
        else if(! Hash::check($r->password, $user->password))
        {
            return $this->res(1,'Wrong Email or Password!');
        }

        //res
        Session::put('logged',$user->id);
        return $this->res(0,'Login Success');
    
    }

    public function logout(request $r){
        if(Session::has('logged')){
            Session::forget('logged');
            //Session::flush();
            return $this->res(0,'Logout Success');
        } else{
            return $this->res(1,'Has not logged yet');
        }
    }

    public function createUser(request $r){
        if(!$r->username || !$r->email || !$r->password || !$r->role){
            return $this->res(1,'Data cannot be blank!');
        }

        if (!filter_var($r->email, FILTER_VALIDATE_EMAIL)) {
            return $this->res(1,'Invalid email format!');
        }

        $cekEmail = User::where('email',$r->email)->first();
        if($cekEmail){
            return $this->res(1,'Email already exist!');
        }

        $cekRole = Role::where('id',$r->role)->first();
        if(!$cekRole){
            return $this->res(1,'Role does not exist!');
        }

        $insUser            = new User();
        $insUser->username  = $r->username;
        $insUser->email     = $r->email;
        $insUser->password  = Hash::make($r->password);
        $insUser->roles_id  = $r->role;
        $insUser->save();

        return $this->res(0,'New account created!');

    }
    
    public function changePass(request $r){
        
        if(!$r->oldPassword || !$r->newPassword){
            return $this->res(1,'Data cannot be blank!');
        }
        
        $id = Session::get('logged');

        $user = User::where('id',$id)
                    ->first();

        if(!$user){
            return $this->res(1,'Wrong Email or Password!');
        } 
        else if(! Hash::check($r->oldPassword, $user->password))
        {
            return $this->res(1,'Wrong Email or Password!');
        }

        $user->password = Hash::make($r->newPassword);
        $user->save();

        return $this->res(0,'Password has been changed!');

    }

}
