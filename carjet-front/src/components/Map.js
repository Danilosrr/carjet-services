import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import styled from 'styled-components';
import Pin from './Pin';

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
};

const mapOptions = {
    fullscreenControl:false,
    mapId: process.env.REACT_APP_MAP_ID
}

export default function Map(props) {
    const { center,pins } = props;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map',
        googleMapsApiKey: process.env.REACT_APP_MAP_KEY
    })
    console.log(props)
    return isLoaded ? (
        <MapStyle>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} options={mapOptions}>
                {pins.map( coord =>{ 
                    return (
                        <Pin name={coord.name} id={coord.id} coord={{lat:coord.lat, lng: coord.lng}} />
                    )
                })}
            </GoogleMap>
        </MapStyle>
    ) : <></>
}

const MapStyle = styled.article`
  z-index: 0;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`