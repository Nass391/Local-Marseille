<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producteur extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasApiTokens, HasFactory, Notifiable, HasFactory;
    
        protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'nom_exploitation',
        'adresse_exploitation',
        'sous_titre',
        'description_activite',
        'image',
        'longitude',
        'latitude',
    ];

    public function setPasswordAttribute($value) {
    $this->attributes['password'] = Hash::make($value);
  }
  
    public function places()
    {
        return $this->belongsToMany(Place::class, "producteur_place");
    }
    public function produits()
    {
        return $this->belongsToMany(Produit::class, "producteurs_produits");
    }

}