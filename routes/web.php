<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;
use App\Http\Controllers\MailController;
// use App\Http\Controllers\Controller;
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

        $user = "api/user/";
        Route::post($user."create",[APIController::class,'createUser']);
        Route::post($user."changepassword",[APIController::class,'changePass']);
        Route::get($user."get",[APIController::class,'getUser']);
        Route::post($user."edit",[APIController::class,'editUser']);
        Route::get($user."getrole",[APIController::class,'getRole']);
        Route::post($user."activate",[APIController::class,'activate']);
        // Route::post('api/createuser',[APIController::class,'createUser']);
        // Route::post('api/changepassword',[APIController::class,'changePass']);
        // Route::get('api/getuser',[APIController::class,'getUser']);
        // Route::post('api/edituser',[APIController::class,'editUser']);
        // Route::get('api/getrole',[APIController::class,'getRole']);
        // Route::post('api/activate',[APIController::class,'activate']);
    });
    Route::post('api/changepassword',[APIController::class,'changePass']);
    Route::get('api/cekadmin',[APIController::class,'cekAdmin']);
    // project
    $project = "api/project/";
    Route::post($project."create",[APIController::class,'createProject']);
    Route::post($project."edit",[APIController::class,'editProject']);
    Route::get($project."get",[APIController::class,'getProject']);
    Route::post($project."spotlight",[APIController::class,'spotlight']);
    Route::post($project."active",[APIController::class,'activeProject']);
    // Route::post('api/createproject',[APIController::class,'createProject']);
    // Route::post('api/editproject',[APIController::class,'editProject']);
    // Route::get('api/getproject',[APIController::class,'getProject']);
    // Route::post('api/spotlight',[APIController::class,'spotlight']);
    // route::post('api/deletegambarlain',[APIController::class,'deleteGambarLain']);
    // route::post('api/editgambarlain',[APIController::class,'editGambarLain']);
    // subscription
    $subscription = "api/subscription/";
    route::get($subscription."get",[APIController::class,'getSubscription']);
    route::get($subscription."activate",[APIController::class,'getSubscription']); //classnya belom dibuat
    // route::get('api/getsubscription',[APIController::class,'getSubscription']);
    // membership
    $membership = "api/membership/";
    route::get($membership."get",[APIController::class,'getMembership']);
    route::post($membership."activate",[APIController::class,'activeMembership']);
    // route::get('api/getmembership',[APIController::class,'getMembership']);
    // route::post('api/membership/active',[APIController::class,'activeMembership']);
    // visitor
    $visitor = "api/visitor/";
    route::get($visitor."get",[APIController::class,'getVisitor']);
    // route::get('api/getvisitor',[APIController::class,'getVisitor']);
    // route::post('api/blast',[MailController::class,'blastMail']);
    // route::get('api/getallemail',[MailController::class,'getAllEmail']);
});
route::post("api/blast",[MailController::class,'blastMail']);
route::get("api/getallemail",[MailController::class,'getAllEmail']);

//alex
route::post('subscription',[APIController::class,'subscription']);
route::post('membership',[APIController::class,'membership']);
route::get('ans',[APIController::class,'ans']);


route::post('api/forgotpassword',[MailController::class,'forgotPassword']);
Route::get('send-email-queue', function(){
    $details['email'] = '<EMAIL ADDRESS>';
    dispatch(new App\Jobs\BlastJob($details));
    return response()->json(['message'=>'Mail Send Successfully!!']);
});
//testing admin
route::get('api/test',[APIController::class,'test']);

