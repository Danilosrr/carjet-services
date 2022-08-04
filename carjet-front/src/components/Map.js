import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import styled from 'styled-components';
import Pin from './Pin';
import { Box, Button, Divider } from '@mui/material';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { FaHandshake } from "react-icons/fa";

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
};

const mapOptions = {
    zoomControl:false,
    fullscreenControl:false,
    mapId: process.env.REACT_APP_MAP_ID
}

const coords=[
    {id:1, name:'filial 1',lat:-7.1786392072688345, lng:-34.83703429614767},
    {id:2, name:'filial 2',lat:-7.128454017722097, lng:-34.86312917317562},
    {id:3, name:'filial 3',lat:-7.072320816924103, lng:-34.84276138545525},
    {id:4, name:'filial 4',lat:-7.0667796520529755, lng:-34.84883053158572},
    {id:5, name:'filial 5',lat:-7.241346278412283, lng:-35.89021354787413},
    {id:6, name:'filial 6',lat:-7.014509474877183, lng:-35.856612492032696},
    {id:7, name:'filial 7',lat:-8.119797509204886, lng:-34.899330599456306}
]

export default function Map(props) {
    const [location,setLocation] = useState(null);
    const [branches,setBranches] = useState(false);

    function getCoords(geolocation) {
        const lat = geolocation.coords.latitude;
        const lng = geolocation.coords.longitude;
        setLocation({lat, lng}) 
    }

    useEffect(()=>{
        try {
            navigator.geolocation.getCurrentPosition(getCoords);      
        } catch (error) {
            console.log(error)
        }
    },[])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map',
        googleMapsApiKey: process.env.REACT_APP_MAP_KEY
    })

    return isLoaded ? (
        <MapStyle>
            <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={12} options={mapOptions} >
                {branches?coords.map( coord =>{ 
                    return (
                        <Pin key={coord.id} name={coord.name} id={coord.id} coord={{lat:coord.lat, lng: coord.lng}} />
                    )
                }):<></>}
            </GoogleMap>
            <Box sx={{ display:'flex', flexDirection:'column-reverse', alignItems:'flex-start', position:'absolute', bottom:'5px', left:'5px', backgroundColor:'rgba(255,255,255,0.95)' }}>
                <Button sx={{ display:'flex', justifyContent:'flex-start', color:'#000000' }} fullWidth={true} startIcon={<FaHandshake/>}>Fornecedores</Button>
                <Divider sx={{width: '100%', color: '#000000'}}/>
                <Button sx={{ display:'flex', justifyContent:'flex-start', color:'#000000' }} fullWidth={true} startIcon={<StoreMallDirectoryIcon/>} onClick={()=>setBranches(!branches)}>Filiais</Button>
            </Box>
        </MapStyle>
    ) : <></>
}

const MapStyle = styled.div`
  z-index: 0;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`