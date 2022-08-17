<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Cookie;

use App\Models\User;
use App\Models\Role;
use App\Models\Token;
use App\Models\Visitor;
use App\Models\Sess;
use App\Models\Project;
use App\Mail\TestMail;

class APIController extends Controller
{
    
    
    public function test(){

        
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
        else if($user->deleted_at){
            return $this->res(1,'Account not active!');
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
            return $this->res(1,'Wrong Password!');
        }

        $user->password = Hash::make($r->newPassword);
        $user->save();

        return $this->res(0,'Password has been changed!');

    }

    public function getUser(){
        $data = User::all();
        if($data->isEmpty()){
            return $this->res(1,'Data empty');
        }else{
            foreach($data as $d){
                if(!$d->deleted_at){
                    $active = 1;
                } else{
                    $active = 0;
                }
                $item[]= [
                    'id'            => $d->id,
                    'username'      => $d->username,
                    'email'         => $d->email,
                    'role'          => $d->roles->role,
                    'roles_id'      => $d->roles_id,
                    'active'        => $active,
                ];
            }
            return $this->res(0,'Data retrieved','',$item);
        }
    }

    public function editUser(request $r){


        if(!$r->id){
            return $this->res(1,'User ID needed!');
        }

        if(!$r->username || !$r->role){
            return $this->res(1,'Data cannot be blank!');
        }

        $cekRole = Role::where('id',$r->role)->first();

        if(!$cekRole){
            return $this->res(1,'Role does not exist!');
        }
        
        $editUser = User::where('id',$r->id)->first();
        $editUser->username  = $r->username;
        $editUser->roles_id  = $r->role;
        $editUser->save();

        return $this->res(0,'Account has been updated!');
    }

    public function getRole(){
        $data = Role::all();
        return $this->res(0,'Data retrieved','',$data);
    }

    public function cekAdmin(){
        $data = Session::get('logged');
        if(!$data){
            $data =[
                'status'=>9,
                'message'=>'You must be logged in',
                 ];
                return response()->json($data);
        } else{
            return $data;
        }
    }

    public function activate(request $r){
        if(!$r->active || $r->id){
            return $this(1,'Data cannot be empty!');
        }

        $cekUser = User::where('id',$r->id)->first();

        if(!$cekUser){ 
            return $this(1,'User not found!');
        }
        
        if($r->active == 1){ //kalo 1 minta diactivate
            if(!$cekUser->deleted_at){
                return $this(1,'User is active!');
            } else{
                $cekUser->deleted_at = null;
                $cekUser->save();
                return $this(0,'User has been activated!');
            }
        } else if($r->active == 0){ //kalo 0 minta dinonaktif
            if($cekUser->deleted_at){
                return $this(1,'User is inactive!');
            } else{
                $cekUser->deleted_at = Carbon::now();
                $cekUser->save();
                return $this(0,'User has been deactivated!');
            }
        } else{
            return $this(1,'Invalid request!');
        }


    }
    
    public function getProject(){
        $data = Project::all();
        if($data->isNotEmpty){
            return $this->res(0,"Data retrieved",'',$data);
        } else{
            return $this->res(1,"Data empty",'',$data);
        }
    }
    
    public function createProject(request $r){
        if(!$r->name || !$r->description){
            return $this->res(1,'Data cannot be empty!');
        }
        if(!$r->link){
            $link = null;
        } else{
            $link = $r->link;
        }
        if ($r->hasFile('picture')) {
            $ext = $r->file('picture')->extension();
            $ext = strtolower($ext);
            $supported_image = array(
                'jpg',
                'jpeg',
                'png'
            );
            if (!in_array($ext, $supported_image)) {
                return $this->res(1,'File is not supported!');
            }
            $name = $r->file('picture')->getClientOriginalName();
            $path = $r->file('picture')->store('public/antinet/projects/'.$name.'.'.$ext);
        } else{
            $path = null;
        }

        $ins = new Project();
        $ins->name = $r->name;
        $ins->description = $r->description;
        $ins->picture = $path;
        $ins->link = $link;
        $ins->save();

        return $this(0,'New project added successfully!');

    }

    public function editProject(request $r){
        if(!$r->name || !$r->description){
            return $this->res(1,'Data cannot be empty!');
        }
        
        if ($r->hasFile('picture')) {
            $ext = $r->file('picture')->extension();
            $ext = strtolower($ext);
            $supported_image = array(
                'jpg',
                'jpeg',
                'png'
            );
            if (!in_array($ext, $supported_image)) {
                return $this->res(1,'File is not supported!');
            }
            $name = $r->file('picture')->getClientOriginalName();
            $path = $r->file('picture')->store('public/antinet/projects/'.$name.'.'.$ext);
        } else{
            $path = null;
        }

        if($r->spotlight){

        }

        $edit = Project::where('id',$r->id)->first();
        if(!$edit){
            return $this->res(1,'Data not exist');
        }


        $edit->name = $r->name;
        $edit->description = $r->description;
        $edit->picture = $path;
        $edit->link = $r->link;
        $edit->spotlight = $r->spotlight;
    }
}
