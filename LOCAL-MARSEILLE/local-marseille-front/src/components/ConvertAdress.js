import React from 'react';
import axios from 'axios';

async function convertAdress() {
    
    axios
        .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${producteurs.adresse_exploitation }.json?access_token=pk.eyJ1IjoibmFzczM5MSIsImEiOiJjbDNscHd2Z2IwMm13M2JwandyaTE3YXJhIn0.SBuLEnFF56RiFtUIFiFDYw`)
        .then(function(response){
            //  handle success
            console.log(response);
        })
        .catch(function(error){
            //  handle error
            console.log(error);
        })
        .then(function(){
            //  always executed
        })
    
    // return places.map(place => (
    //     <Marker latitude={place.latitude} longitude={place.longitude} color="blue" />
            
    // ) )
   
}
export default convertAdress;