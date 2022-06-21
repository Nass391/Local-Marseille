<?php

namespace Database\Seeders;

use App\Models\Marche;
use Illuminate\Database\Seeder;
use File;

class MarcheSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    Marche::truncate();

        $json = File::get("database/data/marche.json");
        $marches = json_decode($json);

        foreach ($marches as $key => $value) {
            Marche::create([
                "titre" => $value->titre,
                "recap" => $value->recap,
                "sous_titre" => $value->sous_titre,
                "description" => $value->description,
                "adresse" => $value->adresse,
                "longitude" => $value->longitude,
                "latitude" => $value->latitude,
                "image" => $value->image
            ]);
        }
    }
}