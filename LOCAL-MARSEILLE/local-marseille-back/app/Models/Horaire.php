<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horaire extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;
    public $timestamps = false;
    
    // protected $identifiableAttribute = ['full_horaire']  ;


    protected $fillable = [
        'jour',
        'heure_debut',
        'heure_fin',
        'frequence',
    ];

     protected $appends = [
        'full_horaire'
    ];

    public function places()
    {
        return $this->belongsToMany(Place::class,  "place_horaire");
    }


      public function getFullHoraireAttribute()
    {
        // process stuff here
        return "{$this->jour} {$this->heure_debut} {$this->heure_fin}";
    }

    //     public function setFullHoraireAttribute()
    // {
    //      $this->attributes['full_horaire'];
    // }
    
    // public function identifiableAttribute()
    // {
    //     // process stuff here
    //     return $this->getFullHoraireAttribute;
    // }
}