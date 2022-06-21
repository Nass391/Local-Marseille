import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { useLocation } from "react-router-dom";
import {getOneProducteur} from '../api/apiProducteur';

const MarkerProducteurById = () => {
    const [places, setPlaces] = useState([])
    const [showPopup, setShowPopup] = React.useState(true);
    const [popupInfo, setPopupInfo] = useState(null);
    const [popupInfoProd, setPopupInfoProd] = useState(null);
    const location = useLocation();
    const data = location.state;
    const [producteur, setProducteur] = useState(data);
    console.log("Jean", producteur);

    return(<>
        <Marker latitude={producteur.latitude} longitude={producteur.longitude} color="green"
            onClick={e => {
                e.originalEvent.stopPropagation();
                setPopupInfoProd(producteur);
            }}>
            {popupInfoProd && ( 
                <Popup anchor="top"
                    longitude={Number(popupInfoProd.longitude)}
                    latitude={Number(popupInfoProd.latitude)}
                    onClose={() => setPopupInfoProd(null)}>
                    <h5>{popupInfoProd?.nom_exploitation}</h5>
                </Popup>)}
        </Marker>
        {producteur.places.length != 0 ?
            producteur.places.map(producteur => (
                <Marker latitude={producteur.latitude} longitude={producteur.longitude} color="red"
                    onClick={e => {
                        e.originalEvent.stopPropagation();
                        setPopupInfo(producteur);
                    }}>
                    {popupInfo && (
                        <Popup anchor="top"
                            longitude={Number(popupInfo.longitude)}
                            latitude={Number(popupInfo.latitude)}
                            onClose={() => setPopupInfo(null)}>
                            <h5>{popupInfo?.titre}</h5>
                            <ul>
                        {popupInfo?.horaires.map(placehoraire => {
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
        : null}
    </>);
}
export default MarkerProducteurById;