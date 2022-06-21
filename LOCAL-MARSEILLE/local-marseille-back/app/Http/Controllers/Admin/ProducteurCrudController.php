<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ProducteurRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class ProducteurCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class ProducteurCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     * 
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Producteur::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/producteur');
        CRUD::setEntityNameStrings('producteur', 'producteurs');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column('nom');
        CRUD::column('prenom');
        CRUD::column('email');
        // CRUD::column('password');
        CRUD::column('nom_exploitation');
        // CRUD::column('adresse_exploitation');
        // CRUD::column('sous_titre');
        // CRUD::column('description_activite');
        // CRUD::column('image');
        CRUD::column('Produits');

        /**
         * Columns can be defined using the fluent syntax or array syntax:
         * - CRUD::column('price')->type('number');
         * - CRUD::addColumn(['name' => 'price', 'type' => 'number']); 
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(ProducteurRequest::class);

        CRUD::field('nom')->size(6);
        CRUD::field('prenom')->size(6);
        CRUD::field('email');
        CRUD::field('password');
        CRUD::field('nom_exploitation');
        CRUD::field('adresse_exploitation');
        CRUD::field('sous_titre');
        CRUD::field('description_activite');
        CRUD::field('image');
        CRUD::field('Produits');
        // [
        //     'label' => 'Produits', 
        //     'type'      => 'select_multiple',
        //     'name'      => 'produits',
        // ]

        /**
         * Fields can be defined using the fluent syntax or array syntax:
         * - CRUD::field('price')->type('number');
         * - CRUD::addField(['name' => 'price', 'type' => 'number'])); 
         */
    }

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}