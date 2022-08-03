import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import styled from 'styled-components';

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
};

const mapOptions = {
    fullscreenControl:false
}

function MapExample(props) {
    const { isLoaded } = useJsApiLoader({
        id: '8007a3d228cf03d7',
        googleMapsApiKey: process.env.REACT_APP_MAP_KEY
    })
    const { location } = props;

    return isLoaded ? (
        <Map>
            <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15} options={mapOptions}>
                <InfoWindow position={location}>
                    <div>
                        <h1>InfoWindow</h1>
                    </div>
                </InfoWindow>
            </GoogleMap>
        </Map>
    ) : <></>
}

export default MapExample

const Map = styled.article`
  z-index: 0;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`