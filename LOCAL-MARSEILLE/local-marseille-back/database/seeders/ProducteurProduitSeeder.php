<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ProducteurProduitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/producteur-produit.json");
        $producteurs_produits = json_decode($json);

        foreach ($producteurs_produits as $key => $value) {
            Produit::create([
                "label" => $value->label,
            ]);
        }
    }
}