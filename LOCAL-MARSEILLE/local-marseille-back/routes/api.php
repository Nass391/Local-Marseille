<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\MarcheController;
use App\Http\Controllers\HoraireController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\ProducteurController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// 0: AUTHENTIFICATION
Route::post('/auth/register/producteur', [AuthController::class, "registerProducteur"]);
Route::post('/auth/login/producteur', [AuthController::class, "loginProducteur"])->name('producteurLogin');
Route::post('/auth/login/admin', [AuthController::class, "loginAdmin"]);


//  ***** [PROTECTED ROUTES: PRODUCTEURS ONLY ! ] ***** //
Route::middleware('isProducteur')->group( function () {

    Route::get('/admin/index', [AdminController::class, 'getAllAdmin']);
    Route::get('/myprofil', [AdminController::class, 'getMyProfil']);

// 2: MARCHES
Route::post('/marche/create', [MarcheController::class, 'createMarche']);
Route::delete('/marche/delete/{id}', [MarcheController::class, 'deleteMarche']);
Route::post('/marche/update/{id}',[MarcheController::class, "updateMarche"]);

// 3: PRODUCTEURS
Route::post('/producteur/create', [ProducteurController::class, 'createProducteur']);
Route::delete('/producteur/delete/{id}', [ProducteurController::class, 'deleteProducteur']);
Route::post('/producteur/update/{id}',[ProducteurController::class, "updateProducteur"]);
Route::post('/producteur/upload/{id}', [ProducteurController::class, 'uploadImage']);


// 4: PLACES
Route::post('/place/create', [PlaceController::class, 'createPlace']);
Route::delete('/place/delete/{id}', [PlaceController::class, 'deletePlace']);
Route::post('/place/update/{id}',[PlaceController::class, "updatePlace"]);
Route::post('/place/upload/{id}', [PlaceController::class, 'uploadImage']);


// 5: HORAIRES
Route::post('/horaire/create', [HoraireController::class, 'createHoraire']);
Route::delete('/horaire/delete/{id}', [HoraireController::class, 'deleteHoraire']);
Route::post('/horaire/update/{id}',[HoraireController::class, "updateHoraire"]);

// 6: PRODUITS
Route::post('/produit/create', [ProduitController::class, 'createProduit']);
Route::delete('/produit/delete/{id}', [ProduitController::class, 'deleteProduit']);
Route::post('/produit/update/{id}',[ProduitController::class, "updateProduit"]);

});
//  ********************************************************************* //

// 1: ADMIN
// Route::get('/admin/index', [AdminController::class, 'getAllAdmin']);
Route::post('/admin/create', [AdminController::class, 'createAdmin']);
Route::delete('/admin/delete/{id}', [AdminController::class, 'deleteAdmin']);
Route::post('/admin/update/{id}',[AdminController::class, "updateAdmin"]);
Route::get('/admin/{id}', [AdminController::class, 'readAdmin']);

// 2: MARCHES
Route::get('/marche/index', [MarcheController::class, 'getAllMarche']);
Route::get('/marche/{id}', [MarcheController::class, 'readMarche']);

// 3: PRODUCTEURS
Route::get('/producteur/index', [ProducteurController::class, 'getAllProducteur']);

Route::get('/producteur/produit/{id}', [ProducteurController::class, 'getAllProducteurByProduitId']);
Route::get('/producteur/place/{id}', [ProducteurController::class, 'getAllProducteurByProduitId']);

Route::get('/producteur/{id}', [ProducteurController::class, 'readProducteur']);
Route::get('/producteur/image/{id}', [ProducteurController::class, 'readImage']);


// 4: PLACES
Route::get('/place/index', [PlaceController::class, 'getAllPlace']);
Route::get('/place/horaire/{id}', [PlaceController::class, 'getAllPlaceByHoraireId']);
Route::get('/place/producteur/{id}', [PlaceController::class, 'getAllPlaceByProducteurId']);
Route::get('/place/produit/{id}', [PlaceController::class, 'getAllPlaceByProduitId']);

Route::get('/place/{id}', [PlaceController::class, 'readPlace']);

// 5: HORAIRES
Route::get('/horaire/index', [HoraireController::class, 'getAllHoraire']);
Route::get('/horaire/place/{id}', [HoraireController::class, 'getAllHoraireByPlaceId']);

Route::get('/horaire/{id}', [HoraireController::class, 'readHoraire']);

// 6: PRODUITS
Route::get('/produit/index', [ProduitController::class, 'getAllProduit']);
Route::get('/produit/producteur/{id}', [ProduitController::class, 'getAllProduitByProducteurId']);

Route::get('/produit/{id}', [ProduitController::class, 'readProduit']);