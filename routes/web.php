<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestingController;
use App\Http\Controllers\APIController;
use App\Http\Controllers\LoginController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('react');
});
// Route::get('/{path?}',[
//     'uses' => 'TestingController@index',
//     'as'    => 'react',
//     'where' => ['path' => '^(?!data/).*$']
// ]);



// Route::view('/{path?}', 'react')
//     ->where('path', '.*');

route::post('/testing',"TestingController@testing");

route::post('api/login',[APIController::class,'login']);
route::get('api/logout',[APIController::class,'logout']);
route::get('api/checksession',[APIController::class,'checkSession']);
route::group(['middleware'=>['checkSession']],function(){
    //yangmau di middleware
});

route::get('api/test',[APIController::class,'test']);

