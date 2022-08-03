<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestingController extends Controller
{
    public function testing(request $r){
        if($r->username=='audy'){
            $data =[
                'status'=>0,
                'message'=>'SUDAH MANTAP TINGGAL LANJUT'
            ];
        }
        else{
            $data =[
            'status'=>1,
            'message'=>'APAAN NIH'
             ];
        }
        return response()->json($data);
    }
}
