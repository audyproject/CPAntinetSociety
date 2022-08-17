<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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

        if(!$r->title || !$r->body || !$r->subject){
            return $this->res(1,'Email fields cannot be empty!');
        }
        
        $title      = $r->title;
        $body       = $r->body;
        $subject    = $r->subject;

        $details = [
            'title'     => $title,
            'body'      => $body,
            'subject'   => $subject
        ];

        Mail::to("hwijaya91@gmail.com")->send(new BlastMail($details));
        return $this->res(0,'Email sent!');

    }
    
}
