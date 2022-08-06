import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import styled from 'styled-components';
import Pin from './Pin';
import { Box, Button, Divider } from '@mui/material';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { FaHandshake } from "react-icons/fa";
import useAuth from '../hooks/useAuth';
import api from '../services/api';

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

export default function Map(props) {
    const [location,setLocation] = useState(null);
    const [branchBtn,setBranchBtn] = useState(false);
    const [providerBtn,setProviderBtn] = useState(false);
    const [branches,setBranches] = useState(null);
    const [providers,setProviders] = useState(null);
    const { token } = useAuth();
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map',
        googleMapsApiKey: process.env.REACT_APP_MAP_KEY
    })

    useEffect(()=>{        
        function getCoords(geolocation) {
            const lat = geolocation.coords.latitude;
            const lng = geolocation.coords.longitude;
            setLocation({lat, lng}) 
        }
        try {
            navigator.geolocation.getCurrentPosition(getCoords);      
        } catch (error) {
            console.log(error)
        }
    },[])

    useEffect(() => {
        async function loadPage() {
            if (!token) return;
    
            const { data: branches } = await api.getBranches(token);
            setBranches(branches)

            const { data: providers } = await api.getProviders(token);
            setProviders(providers)
        }
        console.log(token)
        loadPage();
    }, [token,branchBtn,providerBtn]);

    return isLoaded ? (
        <MapStyle>
            <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={12} options={mapOptions} >
                {branchBtn?branches.map( coord =>{ 
                    return (
                        <Pin key={coord.id} name={coord.name} id={coord.id} coord={{lat:coord.location.lat, lng: coord.location.lng}} type={'branch'}/>
                    )
                }):<></>}
                {providerBtn?providers.map( coord =>{ 
                    return (
                        <Pin key={coord.id} name={coord.name} id={coord.id} coord={{lat:coord.location.lat, lng: coord.location.lng}} type={'provider'}/>
                    )
                }):<></>}
            </GoogleMap>
            <Box sx={{ display:'flex', flexDirection:'column-reverse', alignItems:'flex-start', position:'absolute', bottom:'5px', left:'5px', backgroundColor:'rgba(255,255,255,0.95)' }}>
                <Button sx={{ display:'flex', justifyContent:'flex-start', color:'#000000' }} fullWidth={true} startIcon={<FaHandshake/>} onClick={()=>setProviderBtn(!providerBtn)}>Fornecedores</Button>
                <Divider sx={{width: '100%', color: '#000000'}}/>
                <Button sx={{ display:'flex', justifyContent:'flex-start', color:'#000000' }} fullWidth={true} startIcon={<StoreMallDirectoryIcon/>} onClick={()=>setBranchBtn(!branchBtn)}>Filiais</Button>
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