import logo from './logo.svg';
import MapExample from './components/map';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import GlobalStyle from './assets/GlobalStyle';

export default function App() {
  const [location,setLocation] = useState(null);

  useEffect(()=>{
    try {
      navigator.geolocation.getCurrentPosition(getCoords);      
    } catch (error) {
      console.log(error)
    }
  },[])
  
  function getCoords(geolocation) {
    const lat = geolocation.coords.latitude;
    const lng = geolocation.coords.longitude;
    setLocation({lat, lng}) 
  }

  return (
    <>
    <GlobalStyle/>
    <Main>
      <Header>
        <img src={logo} alt="logo" />
      </Header>
        {location?<MapExample location={location}/>:<></>}
    </Main>
    </>
  );
}

const Header = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: rgba(40,44,52,0.75);
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;

  img{
    height: 80px;
    opacity: 0.75;
  }

  overflow-x: hidden;
`

const Main = styled.div`
  position: "absolute";
  z-index: 0;
  width: "100%";
  height: "100%";
  overflow-x: hidden;
`