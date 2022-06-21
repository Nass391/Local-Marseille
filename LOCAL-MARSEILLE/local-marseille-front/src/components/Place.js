import React, { useState, useEffect } from 'react';
// import { getAllMarches } from '../api/apiPlace'
import { getAllPlaces } from '../api/apiPlace'

const Place = () => {

    const [places, setPlaces] = useState([]);

    // 2 - AFFICHAGE DES PLACES
    const renderPlaces = () => {
        return places.map(place => {
            return (
                <div key={place.id} className="cardMarches" >
                    <div className="imageMarche-container">
                        <img src={"http://127.0.0.1:8000/file/" + place.image} alt="marchés" className="imageMarches" />
                    </div>
                    <div className="divText">
                        <div className="marcheTitre"> {place.titre}</div>
                        <div className="marcheRecap">{place.recap}</div>
                        <div className="creneaux-producteurs">Jours et horaires d'ouverture</div>
                        <div>{renderPlacesHoraires(place.horaires)}</div>
                        <div className="creneaux-producteurs">Producteurs présents</div>
                        <div>{renderPlacesProducteurs(place.producteurs)}</div>
                    </div>
                </div>
            );
        })
    };

    // 3 - AFFICHAGE DES PLACES-PRODUCTEURS
    const renderPlacesProducteurs = (p) => {
        return p.map(placeproducteur => {
            return (
                <div key={placeproducteur.id} className="horaires-marches">
                    {placeproducteur.nom} - {placeproducteur.prenom} - {placeproducteur.nom_exploitation}
                </div>
            );
        })
    };

    // 4 - AFFICHAGE DES PLACES-HORAIRES
    const renderPlacesHoraires = (p) => {
        return p.map(placehoraire => {
            return (
                <div key={placehoraire.id} className="horaires-marches">
                    {placehoraire.jour} - {placehoraire.heure_debut} - {placehoraire.heure_fin} - {placehoraire.frequence}
                </div>
            );
        })
    };

    useEffect(() => {
        getAllPlaces().then((response) => {
            setPlaces(response)
        })
    }, []);

    return (
        <div className="Places">
            {renderPlaces()}
        </div>
    )

}
export default Place;