<?php

namespace Database\Seeders;

use File;
use App\Models\Producteur;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ProducteurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/producteur.json");
        $producteurs = json_decode($json);

        foreach ($producteurs as $key => $value) {
            Producteur::create([
                "nom" => $value->nom,
                "prenom" => $value->prenom,
                "email" => $value->email,
                "password" => $value->password,
                "nom_exploitation" => $value->nom_exploitation,
                "adresse_exploitation" => $value->adresse_exploitation,
                "longitude" => $value->longitude,
                "latitude" => $value->latitude,
                "sous_titre" => $value->sous_titre,
                "description_activite" => $value->description_activite,
                "image" => $value->image, 
            ]);
            // $producteurs[0]->produits()->sync(1,2);
        }
    }
}