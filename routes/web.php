<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;
use App\Http\Controllers\MailController;
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

//global api admin
route::post('api/login',[APIController::class,'login']);
route::get('api/logout',[APIController::class,'logout']);
route::get('api/checksession',[APIController::class,'checkSession']);

//authenticated api admin
route::group(['middleware'=>['checkSession']],function(){
    //yangmau di middleware
    route::group(['middleware'=>['adminOnly']],function(){
        //adminOnly
        Route::post('api/createuser',[APIController::class,'createUser']);
        Route::post('api/changepassword',[APIController::class,'changePass']);
        Route::get('api/getuser',[APIController::class,'getUser']);
        Route::post('api/edituser',[APIController::class,'editUser']);
        Route::get('api/getrole',[APIController::class,'getRole']);
        Route::post('api/activate',[APIController::class,'activate']);
    });
    Route::get('api/cekadmin',[APIController::class,'cekAdmin']);
    Route::post('api/createproject',[APIController::class,'createProject']);
    Route::post('api/editproject',[APIController::class,'editProject']);
    Route::get('api/getproject',[APIController::class,'getProject']);
    Route::post('api/spotlight',[APIController::class,'spotlight']);
    route::post('api/deletegambarlain',[APIController::class,'deleteGambarLain']);
    route::post('api/editgambarlain',[APIController::class,'editGambarLain']);
    route::post('api/blast',[MailController::class,'blastMail']);
    
});
route::post('api/forgotpassword',[APIController::class,'editGambarLain']);

//testing admin
route::get('api/test',[APIController::class,'test']);

