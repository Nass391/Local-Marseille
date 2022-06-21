<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marche extends Model
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
    
}