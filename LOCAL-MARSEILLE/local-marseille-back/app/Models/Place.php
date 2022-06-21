<?php

namespace App\Models;

use App\Models\Horaire;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Place extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

        protected $fillable = [
        'titre',
        'recap',
        'sous_titre',
        'description',
        'adresse',
        'longitude', 
        'latitude',
        'image',
    ];
    public $timestamps = false;

        public function horaires()
    {
        return $this->belongsToMany(Horaire::class, "place_horaire");
    }

      public function producteurs()
    {
        return $this->belongsToMany(Producteur::class,  "producteur_place");
    }
    
}