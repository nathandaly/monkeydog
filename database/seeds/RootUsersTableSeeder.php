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
        DB::table('users')->insert([
           'name' => 'Nathan Daly',
           'email' => 'justlikephp@gmail.com',
           'password' => Hash::make('Monkeydog1!'),
        ]);
    }
}
