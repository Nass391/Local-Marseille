<?php

namespace Database\Seeders;

use App\Models\Produit;
use Illuminate\Database\Seeder;
use File;

class ProduitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $json = File::get("database/data/produit.json");
        $produits = json_decode($json);

        foreach ($produits as $key => $value) {
            Produit::create([
                "label" => $value->label,
            ]);
        }
    }
}