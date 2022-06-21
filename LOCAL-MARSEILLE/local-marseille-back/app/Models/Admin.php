<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasApiTokens, HasFactory, Notifiable, HasFactory;

      protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'image',
    ];
    public $timestamps = false;
    
    public function setPasswordAttribute($value) {
    $this->attributes['password'] = Hash::make($value);
  }
}