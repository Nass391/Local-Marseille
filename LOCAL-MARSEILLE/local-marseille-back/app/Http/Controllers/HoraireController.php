<?php

namespace App\Http\Controllers;
use Exception;
use App\Models\Place;
use App\Models\Horaire;
use Illuminate\Http\Request;

class HoraireController extends Controller
{
public function getAllHoraire()
   {
       $horaires = Horaire::all();
       return response()->json(['horaires' => $horaires]);
   }

public function getAllHoraireByPlaceId($id)
   {
       try{
        $horaires = Place::findOrFail($id)->horaires()->get();
        if($horaires){
            return response()->json(['horaires'=>$horaires]);
        }else{throw new Exception("Désolé, nous n'avons pas trouvé de créneaux correspondant à ce point e vente :(");}
       } 
       catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }  
   }
   // CRUD
   // 1. CREATE
   public function createHoraire(Request $request)
    {
        try{
        $request->validate([
            'jour' => 'required',
            'heure_debut' => 'required',
            'heure_fin' => 'required',
            'frequence' => 'required',
        ]);
            $newHoraire = Horaire::create($request->all());

            $placeId = $request->has('placeId') ?  $request->get('placeId') : null;
            if ($placeId) {
                $newHoraire->places()->attach($placeId);
            }

            return response()->json(['Bravo, le créneau a été crée avec succès !', $placeId]);
        } catch (\Exception $e){
            return response()->json(['error' =>$e->getMessage()], 500);
        }
    }
   // 2. READ
        public function readHoraire($id)
    {
        try{
              $horaire = Horaire::findOrFail($id);
            if ($horaire){
                return response()->json(['horaire'=>$horaire]);
            }else{
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    
    }
    // 3. UPDATE
        public function updateHoraire (Request $request, $id)
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
        $horaire = Horaire::find($id);
            if($horaire){
            $horaire->update($request->all());
            $horaire->save();
            return response()->json("Bravo, le créneau a été modifié avec succès !");
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
   public function deleteHoraire($id)
    {
        try{
            $horaire = Horaire::find($id);
            if($horaire){
                $horaire->delete();
                return response()->json("Bravo, le créneau a été supprimé avec succès !");
            } else {
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }
        catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }  
    }
}