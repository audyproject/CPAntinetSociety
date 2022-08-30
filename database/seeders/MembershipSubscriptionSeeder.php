<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MembershipSubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bates = 0;
        while($bates <= 50){
            DB::table('subscriptions')->insert([
                'email' => 'subscriber'.$bates.'@ans.com',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now(),
            ]);
            DB::table('memberships')->insert([
                'nama' => 'member'.$bates,
                'email' => 'member'.$bates.'@ans.com',
                'telpon' => '08123456789'.$bates,
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now(),
            ]);
            $bates++;
        }
        
    }
}
