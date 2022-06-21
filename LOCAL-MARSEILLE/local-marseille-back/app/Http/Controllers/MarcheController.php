<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Marche;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MarcheController extends Controller
{
    public function getAllMarche()
   {
       $marches = Marche::all();
       return response()->json(['marches' => $marches]);
   }

   // CRUD
   // 1. CREATE
   public function createMarche(Request $request)
    {
        try{
        $request->validate([
            'titre' => 'required',
            'recap' => 'required',
            'sous_titre' => 'required',
            'description' => 'required',
            'adresse' => 'required',
            'image',
        ]);
            Marche::create($request->all());
            return ('Bravo, le marché a été crée avec succès !');
        } catch (\Exception $e){
            return response()->json(['error' =>$e->getMessage()], 500);
        }
    }
   // 2. READ
        public function readMarche($id)
    {
        try{
              $marche = Marche::findOrFail($id);
            if ($marche){
                return response()->json(['marche'=>$marche]);
            }else{
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    
    }
    // 3. UPDATE
        public function updateMarche (Request $request, $id)
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
        $marche = Marche::find($id);
            if($marche){
            $marche->update($request->all());
            $marche->save();
            return response()->json("Bravo, le marché a été modifié avec succès !");
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
   public function deleteMarche($id)
    {
        try{
            $marche = Marche::find($id);
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
    
}