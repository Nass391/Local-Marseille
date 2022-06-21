<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;
    public $timestamps = false;

       protected $fillable = [
        'label',
    ];
    
    public function producteurs()
    {
        return $this->belongsToMany(Producteur::class, "producteurs_produits");
    }
}