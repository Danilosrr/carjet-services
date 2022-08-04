import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Map from '../components/Map';
import Header from '../components/shared/Header';

const coords=[
    {id:1, name:'filial 1',lat:-7.1786392072688345, lng:-34.83703429614767},
    {id:2, name:'filial 2',lat:-7.128454017722097, lng:-34.86312917317562},
    {id:3, name:'filial 3',lat:-7.072320816924103, lng:-34.84276138545525},
    {id:4, name:'filial 4',lat:-7.0667796520529755, lng:-34.84883053158572},
    {id:5, name:'filial 5',lat:-7.241346278412283, lng:-35.89021354787413},
    {id:6, name:'filial 6',lat:-7.014509474877183, lng:-35.856612492032696},
    {id:7, name:'filial 7',lat:-8.119797509204886, lng:-34.899330599456306}
]

export default function Home(){
    const [location,setLocation] = useState(null);
    
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
    console.log(location)
    return(
        <HomeStyle>
            <Map pins={coords} center={location}/>
            <Header/>
        </HomeStyle>
    )
}

const HomeStyle = styled.div`
  position: "absolute";
  z-index: 0;
  width: "100%";
  height: "100%";
  overflow-x: hidden;
`