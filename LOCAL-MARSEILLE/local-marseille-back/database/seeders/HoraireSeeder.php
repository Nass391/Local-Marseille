<?php

namespace Database\Seeders;

use App\Models\Horaire;
use Illuminate\Database\Seeder;
use File;

class HoraireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/horaire.json");
        $horaires = json_decode($json);

        foreach ($horaires as $key => $value) {
            Horaire::create([
                "jour" => $value->jour,
                "heure_debut" => $value->heure_debut,
                "heure_fin" => $value->heure_fin,
                "frequence" => $value->frequence,
            ]);

        }
    }
}