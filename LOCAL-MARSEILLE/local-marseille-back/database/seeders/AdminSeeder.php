<?php

namespace Database\Seeders;

use File;
use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::truncate();

        $json = File::get("database/data/admin.json");
        $admins = json_decode($json);

        foreach ($admins as $key => $value) {
            Admin::create([
                "nom" => $value->nom,
                "prenom" => $value->prenom,
                "email" => $value->email,
                "password" => Hash::make($value->password),
                "image" => $value->image,
            ]);

        }
    }
}