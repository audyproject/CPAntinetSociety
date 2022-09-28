<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'role' => 'admin',
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now(),
        ]);
        DB::table('roles')->insert([
            'role' => 'user',
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now(),
        ]);
        DB::table('users')->insert([
            'username' => 'ANS',
            'email' => 'antinetsociety@gmail.com',
            'password' => Hash::make('AntinetSociety123!'),
            'roles_id'=>'1',
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now(),
        ]);
        
    }
}
