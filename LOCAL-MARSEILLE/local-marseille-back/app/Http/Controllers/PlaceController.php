<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Place;
use App\Models\Horaire;
use App\Models\Produit;
use App\Models\Producteur;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PlaceController extends Controller
{
 public function getAllPlace()
   {
       $places = Place::with('producteurs', 'horaires')->get();
       return response()->json(['places' => $places]);
   }
   
public function getAllPlaceByHoraireId($id)
   { 
       try{
            $places = Horaire::findOrFail($id)->places()->with('producteurs')->get();
            return response()->json(['places'=>$places]);
       }catch (\Exception $e){
            return response()->json(['error' =>$e->getMessage()], 500);
        }
   }

public function getAllPlaceByProducteurId($id)
   { 
       try{
           $places = Producteur::findOrFail($id)->places()->with('horaires')->get();
            return response()->json(['places'=>$places]);
       }catch (\Exception $e){
            return response()->json(['error' =>$e->getMessage()], 500);
        } 
   }

   public function getAllPlaceByProduitId($id)
   { 
        try{
           $places = Produit::where('id', $id)->with('producteurs', 'producteurs.places')->get();
            return response()->json(['places'=>$places]);
       }catch (\Exception $e){
            return response()->json(['error' =>$e->getMessage()], 500);
        } 
   }
   // CRUD
   // 1. CREATE
   public function createPlace(Request $request)
    {
        try{
        $request->validate([
            'titre' => 'required',
            'recap',
            'sous_titre',
            'description',
            'adresse' => 'required',
            'image',
        ]);

        $newPlace = Place::create($request->all());
        $producteurId = $request->has('producteurId') ?  $request->get('producteurId') : null;
            if ($producteurId) {
                $newPlace->producteurs()->attach($producteurId);
            }
            return ($newPlace);
        } catch (\Exception $e){
            return response()->json(['error' =>$e->getMessage()], 500);
        }
    }
   // 2. READ
        public function readPlace($id)
    {
        try{
              $place = Place::findOrFail($id);
            if ($place){
                return response()->json(['place'=>$place]);
            }else{
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    
    }
    // 3. UPDATE
        public function updatePlace (Request $request, $id)
    {
        try {
            $request->validate([
            'titre' => 'required',
            'recap',
            'sous_titre',
            'description',
            'adresse' => 'required',
            'image',
            'producteur_id' => 'required' 
        ]);
        $place = Place::find($id);
            if($place){
            $place->update($request->all());
            $place->save();
            return response()->json("Bravo, le point de vente a été modifié avec succès !");
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
   public function deletePlace($id)
    {
        try{
            $place = Place::find($id);
            if($place){
                $place->delete();
                return response()->json("Bravo, le point de vente a été supprimé avec succès !");
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
                    $place = Place::findOrFail($id);
                    if($place){
                        $place->update([
                        'image' => $filename
                        ]);
                        $place->save();
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
            $image = Place::where('id', $id)->get(['image']);
            return response()->json(["status" => "success", "data" => $image]);
        }  
}