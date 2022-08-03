import React from "react"
import styled from "styled-components"
import logo from '../../assets/img/logo.png';

export default function Header(){
    return(
        <HeaderStyle>
            <img src={logo} alt="logo" />
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: rgba(40,44,52,0.80);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;

  img{
    height: 80px;
    opacity: 0.30;
  }

  overflow-x: hidden;
`