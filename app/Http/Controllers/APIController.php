<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Cookie;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Role;
use App\Models\Token;
use App\Models\Visitor;
use App\Models\Sess;
use App\Models\Project;
use App\Models\Subscription;
use App\Models\Membership;
use App\Mail\TestMail;

class APIController extends Controller
{
    
    public function test(){
    }

    public function checkSession(){
        if(Session::has('logged')){
            Session::regenerate();
            $id = Session::get('logged');
            $user = User::where('id',$id)->first();
            if(!$user){
                return $this->res(1,'No Session');
            }
            $obj = (object) array(
                'role'=> $user->roles->role,
                'user_id' => $user->id
            );
            return $this->res(0,'Success','',$obj);
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
        $obj = (object) array(
            'role'=> $user->roles->role,
            'user_id' => $user->id
        );
        return $this->res(0,'Login Success','',$obj);
    
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
        // return $this->res(0, $r->active);
        if(!isset($r->active) || !isset($r->id)){
            return $this->res(1,'Data cannot be empty!');
        }

        $cekUser = User::where('id',$r->id)->first();

        if(!$cekUser){ 
            return $this->res(1,'User not found!');
        }
        
        if($r->active == 1){ //kalo 1 minta diactivate
            if(!$cekUser->deleted_at){
                return $this->res(1,'User is active!');
            } else{
                $cekUser->deleted_at = null;
                $cekUser->save();
                return $this->res(0,'User has been activated!');
            }
        } else if($r->active == 0){ //kalo 0 minta dinonaktif
            if($cekUser->deleted_at){
                return $this->res(1,'User is inactive!');
            } else{
                $cekUser->deleted_at = Carbon::now();
                $cekUser->save();
                return $this->res(0,'User has been deactivated!');
            }
        } else{
            return $this->res(1,'Invalid request!');
        }


    }
    
    public function getProject(){
        $data = Project::all();
        return $this->res(0,"Data retrieved",'',$data);
        
    }
    
    public function createProject(request $r){
        if(!$r->name || !$r->description || !$r->judul_paragraf1 || !$r->isi_paragraf1 || !$r->judul_paragraf2 || !$r->isi_paragraf2){
            return $this->res(1,'Data cannot be empty!');
        }
        if(!$r->link){
            $link = null;
        } else{
            $link = $r->link;
        }

        $cekName = Project::where('name',$r->name)->first();
        if($cekName){
            return $this->res(1,'This project name exists!');
        }
        
        $supported_image = array(
            'jpg',
            'jpeg',
            'png'
        );
        if ($r->hasFile('gambar_utama')) {
            $ext = $r->file('gambar_utama')->extension();
            $ext = strtolower($ext);
            if (!in_array($ext, $supported_image)) {
                return $this->res(1,'File is not supported!');
            }
            $r->file('gambar_utama')->move(public_path('antinet/projects'),$r->name.'_gambarutama.'.$ext);
            $path_gambarutama = 'antinet/projects/'.$r->name.'_gambarutama.'.$ext;
        } else{
            return $this->res(1,'Gambar Utama cannot be empty!');
        }

        if ($r->hasFile('gambar_kiri')) {
            $ext = $r->file('gambar_kiri')->extension();
            $ext = strtolower($ext);
            if (!in_array($ext, $supported_image)) {
                return $this->res(1,'File is not supported!');
            }
            $r->file('gambar_kiri')->move(public_path('antinet/projects'),$r->name.'_gambarkiri.'.$ext);
            $path_gambarkiri = 'antinet/projects/'.$r->name.'_gambarkiri.'.$ext;
        } else{
            return $this->res(1,'Gambar Kiri cannot be empty!');
        }

        if ($r->hasFile('gambar_kanan')) {
            $ext = $r->file('gambar_kanan')->extension();
            $ext = strtolower($ext);
            if (!in_array($ext, $supported_image)) {
                return $this->res(1,'File is not supported!');
            }
            $r->file('gambar_kanan')->move(public_path('antinet/projects'),$r->name.'_gambarkanan.'.$ext);
            $path_gambarkanan = 'antinet/projects/'.$r->name.'_gambarkanan.'.$ext;
        } else{
            return $this->res(1,'Gambar Kanan cannot be empty!');
        }
        if($r->hasFile('gambar_lain')){
            $flag=1;
            foreach($r->file('gambar_lain') as $image)
            {
                $ext = $image->extension();
                $ext = strtolower($ext);
                if (!in_array($ext, $supported_image)) {
                    return $this->res(1,'File is not supported!');
                }
                $image->move(public_path('antinet/projects'),$r->name.'_gambarlain_'.$flag.".".$ext);
                $gambar_lain[] = 'antinet/projects/'.$r->name.'_gambarlain_'.$flag.'.'.$ext;
                $flag++;
            }
        } else{
            $gambar_lain = [];
        }

        $ins = new Project();
        $ins->name = $r->name;
        $ins->description = $r->description;
        $ins->judul_paragraf1 = $r->judul_paragraf1;
        $ins->isi_paragraf1 = $r->isi_paragraf1;
        $ins->judul_paragraf2 = $r->judul_paragraf2;
        $ins->isi_paragraf2 = $r->isi_paragraf2;
        $ins->gambar_utama = $path_gambarutama;
        $ins->gambar_kiri = $path_gambarkiri;
        $ins->gambar_kanan = $path_gambarkanan;
        $ins->gambar_lain = json_encode($gambar_lain);
        $ins->hashtag=json_encode($r->hashtag);
        $ins->link = $link;
        $ins->save();

        return $this->res(0,'New project added successfully!');

    }

    public function editProject(request $r){
        if(!$r->id || !$r->name || !$r->description || !$r->judul_paragraf1 || !$r->isi_paragraf1 || !$r->judul_paragraf2 || !$r->isi_paragraf2){
            return $this->res(1,'Data cannot be empty!');
        }

        $edit = Project::where('id',$r->id)->first();
        if(!$edit){
            return $this->res(1,'Data not found!');
        }

        if(!$r->link){
            $link = null;
        } else{
            $link = $r->link;
        }
        
        $supported_image = array(
            'jpg',
            'jpeg',
            'png'
        );
        if ($r->hasFile('gambar_utama')) {
            $ext = $r->file('gambar_utama')->extension();
            $ext = strtolower($ext);
            if (!in_array($ext, $supported_image)) {
                return $this->res(1,'File is not supported!');
            }
            $r->file('gambar_utama')->move(public_path('antinet/projects'),$r->name.'_gambarutama.'.$ext);
            $path_gambarutama = 'antinet/projects/'.$r->name.'_gambarutama.'.$ext;
            
            $edit->gambar_utama = $path_gambarutama;
        } 

        if ($r->hasFile('gambar_kiri')) {
            $ext = $r->file('gambar_kiri')->extension();
            $ext = strtolower($ext);
            if (!in_array($ext, $supported_image)) {
                return $this->res(1,'File is not supported!');
            }
            $r->file('gambar_kiri')->move(public_path('antinet/projects'),$r->name.'_gambarkiri.'.$ext);
            $path_gambarkiri = 'antinet/projects/'.$r->name.'_gambarkiri.'.$ext;
            $edit->gambar_kiri = $path_gambarkiri;
        } 

        if ($r->hasFile('gambar_kanan')) {
            $ext = $r->file('gambar_kanan')->extension();
            $ext = strtolower($ext);
            if (!in_array($ext, $supported_image)) {
                return $this->res(1,'File is not supported!');
            }
            $r->file('gambar_kanan')->move(public_path('antinet/projects'),$r->name.'_gambarkanan.'.$ext);
            $path_gambarkanan = 'antinet/projects/'.$r->name.'_gambarkanan.'.$ext;
            $edit->gambar_kanan = $path_gambarkanan;
        } 

        $edit->name = $r->name;
        $edit->description = $r->description;
        $edit->judul_paragraf1 = $r->judul_paragraf1;
        $edit->isi_paragraf1 = $r->isi_paragraf1;
        $edit->judul_paragraf2 = $r->judul_paragraf2;
        $edit->isi_paragraf2 = $r->isi_paragraf2;
        $edit->hashtag=json_encode($r->hashtag);
        $edit->link = $link;
        $edit->save();

        return $this->res(0,'Project saved successfully!');

    }

    public function spotlight(request $r){
        if(!isset($r->id)){
            return $this->res(1,'Data cannot be empty!');
        }

        $cekSpotlight = Project::where('id',$r->id)->first();
        if(!$cekSpotlight){
            return $this->res(1,'Data cannot be empty!');
        }

        $nonSpotlight = Project::where('spotlight',1)->first();
        if($nonSpotlight){
            $nonSpotlight->spotlight = 0;
            $nonSpotlight->save();
        }

        $cekSpotlight->spotlight =1;
        $cekSpotlight->save();

        return $this->res(0,'Spotlight changed!');
        
    }

    public function deleteGambarLain(request $r){
        if(!isset($r->id) || !$r->delete){
            return $this->res(1,'Data cannot be empty!');
        }

        $del = Project::where('id',$r->id)->first();
        if(!$del){
            return $this->res(1,'Data not found!');
        }
        
        $del->gambar_lain = json_encode(array_merge(array_diff(json_decode($del->gambar_lain), array($r->delete))));
        unlink($r->delete);
        $del->save();


        return $this->res(0,'Delete success!');

    }

    public function editGambarLain(request $r){
        
        if(!isset($r->id)){
            return $this->res(1,'Data cannot be empty!');
        }

        $edit = Project::where('id',$r->id)->first();
        if(!$edit){
            return $this->res(1,'Data not found!');
        }
        $aray = json_decode($edit->gambar_lain);
        if(!empty($aray)){
            $judultrakhir = end($aray);
            $a = (explode("_",$judultrakhir));
            $b =  (explode(".",$a[2])); 
            $newflag = (int)$b[0] + 1 ;

        } else {
            $newflag = 1;
        }

        if($r->hasFile('gambar_lain')){
            $flag=$newflag;
            $supported_image = array(
                'jpg',
                'jpeg',
                'png'
            );
            foreach($r->file('gambar_lain') as $image)
            {
                $ext = $image->extension();
                $ext = strtolower($ext);
                if (!in_array($ext, $supported_image)) {
                    return $this->res(1,'File is not supported!');
                }
                $image->move(public_path('antinet/projects'),$edit->name.'_gambarlain_'.$flag.".".$ext);
                // $gambar_lain = json_decode($edit->gambar_lain);
                array_push($aray,'antinet/projects/'.$edit->name.'_gambarlain_'.$flag.'.'.$ext);
                $flag++;
            }
            $edit->gambar_lain = json_encode($aray);
            $edit->save();
            return $this->res(0,'Data saved successfully!');
        } else {
            return $this->res(1,'Data not found!');
        }
    }

    public function getSubscription(){
        $data = Subscription::all();
        return $this->res(0,'Data Retrieved!','',$data);
    }

    public function getMembership(){
        $data = Membership::all();
        return $this->res(0,'Data Retrieved!','',$data);
    }

    public function activeMembership(request $r){
        if(!$r->id){
            return $this->res(1,'Data cannot be empty!');
        }

        if($r->isactive > 1 || $r->isactive < 0){
            return $this->res(1,'Invalid request!');
        }
        
        $act = Membership::where('id',$r->id)->first();
        if(!$act){
            return $this->res(1,'Data cannot be empty!');
        }

        $act->isactive = $r->isactive;
        $act->save();
        if($r->isactive == '1'){
            return $this->res(0,'Data activated!');
        } else {
            return $this->res(0,'Data deactivated!');
        }

    }

    public function getVisitor(){

        $tanggal = Visitor::where('created_at', '>=', Carbon::now()->subMonth())
                            ->groupBy('date')
                            ->orderBy('date', 'DESC')->limit(7)
                            ->get(array(
                                DB::raw('day(created_at) as date'),
                                DB::raw('COUNT(*) as "views"')
                            ));

        $bulan = Visitor::groupBy('date')
        ->orderBy('date', 'DESC')->limit(3)
        ->get(array(
            DB::raw('month(created_at) as date'),
            DB::raw('COUNT(*) as "views"')
        ));

        $tahun = Visitor::groupBy('date')
        ->orderBy('date', 'DESC')->limit(3)
        ->get(array(
            DB::raw('year(created_at) as date'),
            DB::raw('COUNT(*) as "views"')
        ));

        // $tigatahun = Visitor::groupBy(DB::raw('floor(period_diff(date_format(current_date,"%Y"),date_format(rangemin,"%Y"))/3)'))
        // // ->orderBy('date', 'DESC')
        // ->get(array(
        //     DB::raw('MIN(created_at) as rangemin'),
        //     DB::raw('MAX(created_at) as rangemax'),
        //     DB::raw('COUNT(*) as "views per tahun"')
        // ));
         
        $data[0] = $tanggal;
        $data[1] = $bulan;
        $data[2] = $tahun;
        // $data[3] = $tigatahun;

        return $this->res(0,'','',$data);
    }

    //alex
    public function subscription(request $r){
        if(!$r->email){
            return $this->res(1,'Please fill email !');
        }

        $cek = Subscription::where('email',$r->email)->first();
        if(!$cek){
            $ins = new Subscription();
            $ins->email = $r->email;
            $ins->save();
            return $this->res(0,'Subscribe Success !');
        }
        else {
            return $this->res(0,'Subscribe Success !');
        }
    }

    public function membership(request $r){
        if(!$r->name && !$r->email && !$r->phone){
            return $this->res(1,'Please fill');
        }

        $nama = $r->name;
        $email = $r->email;
        $telpon = $r->phone;

        $ins = new Membership();
        $ins->nama = $nama;
        $ins->email = $email;
        $ins->telpon = $telpon;
        $ins->save();

        return $this->res(0,'Join membership success!');
    }

    public function ans(){
        $project = Project::all();
        return response()->json([
            'project'  => $project
        ]);
    }

}
