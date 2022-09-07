<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Subscription;
use App\Mail\ForgotMail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Bus\Queueable;

class MailController extends Controller
{

    public function res($status='',$message='',$token = '',$data=''){
        return response()->json([
            'status'  => $status,
            'message' => $message,
            'token'   => $token,
            'data'    => $data,
        ]);
    }

    public function blastMail(request $r){

        if(!$r->title || !$r->body || !$r->to){
            return $this->res(1,'Email fields cannot be empty!');
        }
        
        $title      = $r->title;
        $body       = $r->body;
        $to         = $r->to;

        $details = [
            'title'     => $title,
            'body'      => $body
        ];

        if($to=='all'){
            $ke = Subscription::all()->pluck('email');
        } else {
            $ke = $to;
        }

        Mail::to($ke)->send(new BlastMail($details));
        return $this->res(0,'Email sent!');

    }

    public function getAllEmail(){
        $data = Subscription::all();
        return $this->res(0,'Data retrieved','',$data);
    }

    public function forgotPassword(request $r){

        if(!$r->email){
            return $this->res(1,'Email cannot be empty!');
        }
        $cekEmail = User::where('email',$r->email)->first();
        if(!$cekEmail){
            return $this->res(0,'Email sent!');
        }
        $pass       = Str::random(8);
        $title      = 'Forgot Password';
        $body       = 'Your new password is : '.$pass;
        $subject    = 'Forgot Password';
        
        $details = [
            'title'     => $title,
            'body'      => $body,
            'subject'   => $subject
        ];
        
        $cekEmail->password = Hash::make($pass);
        $cekEmail->save();
        Mail::to($cekEmail->email)->send(new ForgotMail($details));
        return $this->res(0,'Email sent!');

    }
    
}
