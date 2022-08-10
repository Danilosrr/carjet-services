import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Box, Button, Divider } from '@mui/material';
import { FaHandshake } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import styled from 'styled-components';
import Pin from './Pin';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
};
const logoutbutton = { 
    display: 'flex', 
    justifyContent:'flex-start', 
    backgroundColor: "rgba(255,255,255,0.95)", 
    position: "absolute", 
    bottom: "15px", 
    right: "14px" 
}
const mapOptions = {
    zoomControl:false,
    fullscreenControl:false,
    mapId: process.env.REACT_APP_MAP_ID
}

export default function Map(props) {
    const [location,setLocation] = useState(null);
    const [providerBtn,setProviderBtn] = useState(false);
    const [providers,setProviders] = useState(null);
    const { token,signOut } = useAuth();
    const navigate = useNavigate();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map',
        googleMapsApiKey: process.env.REACT_APP_MAP_KEY
    })

    function handleSignOut() {
        navigate("/");
        signOut();
    }

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

            const { data: providers } = await api.getProviders(token);
            setProviders(providers)
        }
        console.log(token)
        loadPage();
    }, [token,providerBtn]);

    return isLoaded ? (
        <MapStyle>
            <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={12} options={mapOptions} >
                {providerBtn?providers.map( coord =>{ 
                    return (
                        <Pin key={coord.id} name={coord.name} id={coord.id} coord={{lat:coord.location.lat, lng: coord.location.lng}} type={'provider'}/>
                    )
                }):<></>}
            </GoogleMap>
            <Box sx={{ display:'flex', flexDirection:'column-reverse', alignItems:'flex-start', position:'absolute', bottom:'5px', left:'5px', backgroundColor:'rgba(255,255,255,0.95)' }}>
                <Button sx={{ display:'flex', justifyContent:'flex-start', color:'#000000' }} fullWidth={true} startIcon={<FaHandshake/>} onClick={()=>setProviderBtn(!providerBtn)}>Fornecedores</Button>
                <Divider sx={{width: '100%', color: '#000000'}}/>
            </Box>
            <Box sx={logoutbutton}>
                <Button sx={{ color:"#000000" }} onClick={handleSignOut} startIcon={<LogoutIcon sx={{ fontSize: "26px"}}/>}>Sair</Button>
            </Box>
        </MapStyle>
    ) : <Oval wrapperStyle={{position:"absolute", top:"0", bottom:"0", left:"0", right:"0", display:"flex", justifyContent:"center", alignItems:"center" }} type="Oval" color="#3cbeff" height={80} width={80}/>    
}

const MapStyle = styled.div`
  z-index: 0;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`