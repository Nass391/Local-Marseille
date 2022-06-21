<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       $this->call([
        AdminSeeder::class, 
        MarcheSeeder::class, 
        ProduitSeeder::class, 
        ProducteurSeeder::class, 
        PlaceSeeder::class, 
        HoraireSeeder::class
    ]);
    }
}