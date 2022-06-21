<?php

namespace App\Http\Controllers;
use Exception;
use App\Models\Produit;
use App\Models\Producteur;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
public function getAllProduit()
   {
       $produits = Produit::all();
       return response()->json(['produits' => $produits]);
   }

public function getAllProduitByProducteurId($id)
   { 
       try{
            $produits = Producteur::findOrFail($id)->produits()->get();
            return response()->json(['produits'=>$produits]);
       }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
   }
   // CRUD
   // 1. CREATE
   public function createProduit(Request $request)
    {
        try{
        $request->validate([
            'label' => 'required',
        ]);
            Produit::create($request->all());
            return ('Bravo, le produit a été crée avec succès !');
        } catch (\Exception $e){
            return response()->json(['error' =>$e->getMessage()], 500);
        }
    }
   // 2. READ
        public function readProduit($id)
    {
        try{
              $produit = Produit::findOrFail($id);
            if ($produit){
                return response()->json(['produit'=>$produit]);
            }else{
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    
    }
    // 3. UPDATE
        public function updateProduit (Request $request, $id)
    {
        try {
            $request->validate([
        
            'titre' => 'string|min:6|max:255',
            'recap',
            'sous_titre',
            'description', 
            'adresse' => 'string',
            'image' => 'string|max:255'
        ]);
        $produit = Produit::find($id);
            if($produit){
            $produit->update($request->all());
            $produit->save();
            return response()->json("Bravo, le produit a été modifié avec succès !");
            }
            else {
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }   
        catch (\Exception $e){
            return response()->json(['error' =>$e->getMessage()], 500);
        }
    }
    // 4. DELETE
   public function deleteProduit($id)
    {
        try{
            $produit = Produit::find($id);
            if($produit){
                $produit->delete();
                return response()->json("Bravo, le produit a été supprimé avec succès !");
            } else {
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }
        catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }  
    }
}