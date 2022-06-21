import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-map-gl';
// import { getAllPlaces } from '../api/apiPlace'

const MarkerMap = ({ producteurs }) => {
    const [places, setPlaces] = useState([])
    const [showPopup, setShowPopup] = React.useState(true);
    const [popupInfo, setPopupInfo] = useState(null);
   


    // useEffect(() => {
    //     getAllPlaces().then((response) => { setPlaces(response) })
    // }, []);

    return producteurs.map(producteur => (producteur.places.map(place => (<Marker latitude={place.latitude} longitude={place.longitude} color="red"
        onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            console.log(place);
            e.originalEvent.stopPropagation();
            setPopupInfo(place);
        }}>
        {popupInfo && (
                <Popup anchor="top"
                    longitude={Number(popupInfo.longitude)}
                    latitude={Number(popupInfo.latitude)}
                    onClose={() => setPopupInfo(null)}>
                    
                    <h5>{popupInfo.titre}</h5>
                    <ul>
                        {popupInfo.horaires.map(placehoraire => {
                        return (
                            <li>
                                {placehoraire.jour} - {placehoraire.heure_debut} - {placehoraire.heure_fin}
                            </li>
                        ) 
                        })}
                    </ul>
                </Popup>)}
        </Marker>
    ))
    ))
}
export default MarkerMap;