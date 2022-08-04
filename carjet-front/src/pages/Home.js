import React from 'react';
import styled from 'styled-components';
import Map from '../components/Map';
import Header from '../components/shared/Header';


export default function Home(){  
    return(
        <HomeStyle>
            <Map/>
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