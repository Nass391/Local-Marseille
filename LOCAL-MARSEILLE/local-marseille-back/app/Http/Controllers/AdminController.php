<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
public function getMyProfil(Request $request){
    return $request->user;
}

   public function getAllAdmin(Request $request)
   {
       $admins = Admin::all();
       return response()->json(['admins' => $admins]);
   }
   public function index(){
       return view('admin');
   }

   // CRUD
   // 1. CREATE
   public function createAdmin(Request $request)
    {
        try{
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required',
            'password' => 'required',
            'image',
        ]);
            Admin::create($request->all());
            return ('Bravo, Admin crée avec succès !');
        } catch (\Exception $e){
            return response()->json(['error' =>$e->getMessage()], 500);
        }
    }
   // 2. READ
        public function readAdmin($id)
    {
        try{
              $admin = Admin::findOrFail($id);
            if ($admin){
                return response()->json(['admin'=>$admin]);
            }else{
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    
    }
    // 3. UPDATE
        public function updateAdmin (Request $request, $id)
    {
        try {
            $request->validate([
        
            'nom' => 'string|min:3|max:25',
            'prenom' => 'string|min:3|max:25',
            'email' => 'string|email|max:255|unique:users',
            'password' => 'string|min:6|max:25', 
            'image' => 'string|max:255'
        ]);
        $admin = Admin::find($id);
            if($admin){
            $admin->update($request->all());
            $admin->save();
            return response()->json("Bravo, Admin modifié avec succès !");
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
   public function deleteAdmin($id)
    {
        try{
            $admin = Admin::find($id);
            if($admin){
                $admin->delete();
                return response()->json("Bravo, Admin supprimé avec succès !");
            } else {
                throw new Exception("Désolé, nous n'avons pas trouvé cet identifiant en base de données :(");
            }
        }
        catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }  
    }
}