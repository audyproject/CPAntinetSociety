<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
class adminOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(!session()->has('logged')){
            $data =[
                'status'=>9,
                'message'=>'You must be logged in',
                 ];
                return response()->json($data);
        } else if(session()->has('logged')){
            $ses = session()->get('logged');
            $cekRole = User::where('id',$ses)->first();
            if(!$cekRole){
                $data =[
                    'status'=>9,
                    'message'=>'You must be logged in',
                     ];
                    return response()->json($data);
            }
            $cek = Role::where('id',$cekRole->roles_id)->first();
            if(!$cek){
                $data =[
                    'status'=>9,
                    'message'=>'Role not found!',
                     ];
                    return response()->json($data);
            } else if($cek->id != 1){
                $data =[
                    'status'=>9,
                    'message'=>'You are not admin!',
                     ];
                    return response()->json($data);
            } else {
                return $next($request);
            }
        }
    }
}
