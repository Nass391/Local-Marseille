import React from 'react';
import Map, { NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MarkerProducteurById from './MarkerProducteurById';
import LogoMarkerExploitation from '../assets/markerExploitation.png';
import LogoMarkerPtsVente from '../assets/markerPtsVente.png';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibmFzczM5MSIsImEiOiJjbDNscHd2Z2IwMm13M2JwandyaTE3YXJhIn0.SBuLEnFF56RiFtUIFiFDYw'; // Set your mapbox token here

const MappById = () => {
  return (
    <>
      <div className='explicationMap'>
        <div className='markerExplicit'>
          <img className="markerExploitation" src={LogoMarkerExploitation} alt="logo" style={{ width: "30px", height: "30px" }} />
          <span className='legende-marker'>Exploitation</span>
        </div>
        <div className='markerExplicit'>
          <img className="markerPtsVente" src={LogoMarkerPtsVente} alt="logo" style={{ width: "30px", height: "30px" }} />
          <span className='legende-marker'>Points de vente</span>
        </div>
      </div>
      <Map
        initialViewState={{
          latitude: 43.310777,
          longitude: 5.369905,
          zoom: 10,
          bearing: 0,
          pitch: 0
        }}
        style={{ width: "40vw", height: "50vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        <MarkerProducteurById />
        {/* <Marker longitude={5.369905} latitude={43.310777} color="red" />
        <Marker longitude={5.99999} latitude={43.99999} color="blue" /> */}

      </Map>
    </>
  );
}

export default MappById;
