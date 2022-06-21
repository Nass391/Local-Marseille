<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\PlaceRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class PlaceCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class PlaceCrudController extends CrudController
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
        CRUD::setModel(\App\Models\Place::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/place');
        CRUD::setEntityNameStrings('place', 'places');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        // CRUD::column('id');
        CRUD::column('titre');
        // CRUD::column('recap');
        // CRUD::column('sous_titre');
        // CRUD::column('description');
        CRUD::column('adresse');
        // CRUD::column('image');
        CRUD::column('Producteurs');
    //    CRUD::column('Horaires');
        CRUD::addColumn([
            'label'     => "Horaires",
            'type'      => 'select_multiple',
            'name'      => 'horaires', 
            'entity'    => 'horaires',
            'model'     => "App\Models\Horaire",
            'attribute' => 'full_horaire',
            // 'pivot'     => true,

        ]);
        // CRUD::addColumn([
        //     'label'     => "Horaires",
        //     'type'      => 'select_multiple',
        //     'name'      => 'horaires', 

        //     'entity'    => 'horaires',
        //     'model'     => "App\Models\Horaire",
        //     'attribute' => 'full_horaire',
        //     'pivot'     => true,

        // ]);

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
        CRUD::setValidation(PlaceRequest::class);

        CRUD::field('titre');
        CRUD::field('recap');
        CRUD::field('sous_titre');
        CRUD::field('description');
        CRUD::field('adresse');
        CRUD::field('Producteurs');
         CRUD::addField([
            'label'     => "Horaires",
            'type'      => 'select_multiple',
            'name'      => 'horaires', 

            'entity'    => 'horaires',
            'model'     => "App\Models\Horaire",
            'attribute' => 'full_horaire',
            'pivot'     => true,

        ]);
        CRUD::field('image');
        // CRUD::field('producteur_id');
       

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