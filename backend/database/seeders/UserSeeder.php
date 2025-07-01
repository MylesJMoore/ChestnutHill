<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate users
        User::truncate();

        // Enable checks again
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create a fixed admin user
        \DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'avatar_path' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed
        User::factory()->count(10)->create();
    }
}