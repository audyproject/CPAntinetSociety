<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestingController extends Controller
{
    public function testing(request $r){
        $data =[
            'status'=>1,
            'message'=>'SUDAH MANTAP TINGGAL LANJUT'
        ];
        return response()->json($data);
    }
}
