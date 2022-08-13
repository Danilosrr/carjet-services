import styled from "styled-components"
import Button from '@mui/material/Button';
import { RiTruckFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { IoMdCar } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export default function Header(){
    const navigate = useNavigate();

    return(
        <Box>
            <HeaderStyle>
                <Button fullWidth={true} startIcon={<IoMdHome className="icon"/>} onClick={()=>{navigate(`/app/home`)}}/>
                <Button fullWidth={true} startIcon={<RiTruckFill className="icon"/>} onClick={()=>{navigate(`/app/stock`)}}/>
                <Button fullWidth={true} startIcon={<IoMdCar className="icon"/>} onClick={()=>{navigate(`/app/services`)}}/>
                <Button fullWidth={true} startIcon={<IoMdDownload className="icon"/>} onClick={()=>{navigate(`/app/upload`)}}/>
            </HeaderStyle>
        </Box>
    )
}

const HeaderStyle = styled.header`
    background-color: rgba(255,255,255,0.95);
    position: absolute;
    top: 0;
    heigth: 60px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;

    .icon {
        color: #000000;
        font-size: 26px;
    }
`