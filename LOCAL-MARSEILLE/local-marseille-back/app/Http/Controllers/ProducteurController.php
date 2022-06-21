<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Place;
use App\Models\Produit;
use App\Models\Producteur;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProducteurController extends Controller
{

    public function getAllProducteur()
   {
       $producteurs = Producteur::with('produits', 'places', 'places.horaires')->get();
       return response()->json(['producteurs' => $producteurs]);
   }

public function getAllProducteurByProduitId($id)
   { 
       try{
           $producteur = Produit::findOrFail($id)->producteurs()->with('places')->get();
            return response()->json(['producteur'=>$producteur]);
       }
       catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        } 
   }

   public function getAllProducteurByPlaceId($id)
   { 
       try{
           $producteur = Place::findOrFail($id)->producteurs()->get();
            return response()->json(['producteur'=>$producteur]);
       }
       catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }    
   }

   // CRUD
   // 1. CREATE
   public function createProducteur(Request $request)
    {
        try{
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required',
            'password' => 'required',
            'nom_exploitation' => 'required',
            'adresse_exploitation',
            'sous_titre', 
            'description_activite', 
            'image'
        ]);
            Producteur::create($request->all());
            return ('Bravo, le producteur a été crée avec succès !');
        } catch (\Exception $e){
            return response()->json(['error' =>$e->getMessage()], 500);
        }
    }
   // 2. READ
        public function readProducteur($id)
    {
        try{
              $producteur = Producteur::with('produits', 'places', 'places.horaires')->findOrFail($id);
            if ($producteur){
                return response()->json(['producteur'=>$producteur]);
            }else{
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    
    }
    // 3. UPDATE
        public function updateProducteur (Request $request, $id)
    {
        try {
            $request->validate([
            'nom',
            'prenom',
            'email',
            'password',
            'nom_exploitation',
            'adresse_exploitation',
            'sous_titre', 
            'description_activite', 
            'image',
        ]);

        $producteur = Producteur::find($id);

            if($producteur){
                $producteur->update($request->all());
                $producteur->save();
                
                $produitIds = $request->has('produitId') ?  $request->get('produitId') : null;
                var_dump($produitIds);
                if ($produitIds) {
                    $allproduit = Produit::find("");
                    $producteur->produits()->detach($allproduit);
                    foreach ($produitIds as $produitId) {
                        $produits = Produit::find($produitId);
                        $producteur->produits()->attach($produits);
                    }
                }

            return response()->json("Bravo, le producteur a été modifié avec succès !");
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
   public function deleteProducteur($id)
    {
        try{
            $marche = Producteur::find($id);
            if($marche){
                $marche->delete();
                return response()->json("Bravo, le marché a été supprimé avec succès !");
            } else {
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }
        catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }  
    }


    // 5. UPLOAD IMAGE in public/file AND UPDATE IMAGE IN PRODUCTEURS TABLE -> field "image"
    public function uploadImage(Request $request, $id) {
        $response = [];
        $validatedData = $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        if($request->has('file')) {
            $filename = "";
            $type = $request->file->getClientMimeType();
            $size = $request->file->getSize();        
                    $filename = time().rand(). '.'.$request->file->extension();
            $request->file->move(public_path('file'), $filename);
                // A rendre synamique avec l'ID du producteur
                $producteur = Producteur::findOrFail($id);
                if($producteur){
                    $producteur->update([
                    'image' => $filename
                    ]);
                    $producteur->save();
                    $response["status"] = "successs";
                    $response["message"] = "Success! image(s) uploaded";
                }
                else {
                    $response["status"] = "failed";
                    $response["message"] = "Failed! le producteur n'existe pas";
                }
        }
        else {
            $response["status"] = "failed";
            $response["message"] = "Failed! No image selected";
        }
        return response()->json($response);
    }


    // 6. Read image by ID
    public function readImage($id)
    {
        $image = Producteur::where('id', $id)->get(['image']);
        return response()->json(["status" => "success", "data" => $image]);
    }  
}   