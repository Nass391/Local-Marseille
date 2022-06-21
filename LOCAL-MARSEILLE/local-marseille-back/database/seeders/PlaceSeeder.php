<?php

namespace Database\Seeders;

use File;
use App\Models\Place;
use Illuminate\Database\Seeder;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $json = File::get("database/data/marche.json");
        $places = json_decode($json);

        foreach ($places as $key => $value) {
            Place::create([
                "titre" => $value->titre,
                "recap" => $value->recap,
                "sous_titre" => $value->sous_titre,
                "description" => $value->description,
                "adresse" => $value->adresse,
                "longitude" => $value->longitude,
                "latitude" => $value->latitude,
                "image" => $value->image,

            ]);
        }
    }
}