<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class VisitorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bates = 0;
        $sekarang = Carbon::now();
        $random = random_int(1,10);
        $join = $sekarang;
        while($bates < 50){
            if($random == 0){
                $join = $sekarang->subDay();
                $random = random_int(1,10);
            } else {
                $random--;
            }
            DB::table('visitor_log')->insert([
                'ip' => '12.32.187.'.$bates,
                'created_at'=>$join,
                'updated_at'=>$join,
            ]);
            $sekarang = $join;
            $bates++;
        }
    }
}
