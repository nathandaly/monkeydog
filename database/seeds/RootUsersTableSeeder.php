<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class RootUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $timeStamp = new DateTime();
        DB::table('users')->insert([
           'name' => 'Nathan Daly',
           'email' => 'justlikephp@gmail.com',
           'email_verified_at' => $timeStamp,
           'password' => Hash::make('Monkeydog1!'),
            'created_at' => $timeStamp,
        ]);
    }
}
