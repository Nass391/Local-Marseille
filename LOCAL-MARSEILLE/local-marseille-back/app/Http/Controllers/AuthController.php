<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Producteur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
 public function registerProducteur(Request $request)
 {
      $validator = Validator::make($request->all(),[
            'nom' => 'required|string|min:3|max:25',
            'prenom' => 'required|string|min:3|max:25',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|max:25', 
            'nom_exploitation' => 'required|string|min:6|max:255',
            'adresse_exploitation' => 'required|string|min:6|max:255',
            'longitude',
            'latitude',
            'image',
        ]);
        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 401);       
        } else{
            try{
                $producteur = Producteur::create([
                'nom' => ucfirst(strtolower($request->nom)),
                'prenom' => ucfirst(strtolower($request->prenom)),
                'email' => $request->email,
                'password' => $request->password,
                'nom_exploitation' => $request->nom_exploitation,
                'adresse_exploitation' => $request->adresse_exploitation,
                'longitude'  => $request->longitude,
                'latitude' => $request->latitude,
                'image' => $request->image,

            ]);
            $token = $producteur->createToken('producteur_auth_token')->plainTextToken;
            return response()->json(['data' => $producteur,'producteur_access_token' => $token, 'token_type' => 'Bearer' ]);
            }
            catch (\Exception $e){
                return response()->json(['error' => $e->getMessage()], 500);
            }    
        } 
 }

 public function loginProducteur(Request $request)
 {  
    try{
        $producteur = Producteur::where('email', $request['email'])->firstOrFail();
        if(Hash::check($request->password, $producteur->password)){
            $token = $producteur->createToken('auth_token')->plainTextToken;
            return response()->json(['prenom' => $producteur->prenom,'nom' => $producteur->nom,'producteur_access_token' => $token, 'token_type' => 'Bearer' ]);
        } else {
            return response()->json(['message' => 'Unauthorized, Sorry :('], 401);
            }
        }
        catch (\Exception $e){
                return response()->json(['error' => $e->getMessage()], 500);
        }   
 }

  public function loginAdmin(Request $request)
 {
         try{
        $admin = Admin::where('email', $request['email'])->firstOrFail();
        if(Hash::check($request->password, $admin->password)){
            $token = $admin->createToken('auth_token')->plainTextToken;
            return response()->json(['prenom' => $admin->prenom,'nom' => $admin->nom,'admin_access_token' => $token, 'token_type' => 'Bearer' ]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
            }
        }
        catch (\Exception $e){
                return response()->json(['error' => $e->getMessage()], 500);
        }   
 }
}