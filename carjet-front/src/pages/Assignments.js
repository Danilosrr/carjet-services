import * as React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from 'styled-components';
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Assignments() {
    const navigate = useNavigate();

    return (
        <>
            <Accordion sx={{ width: '100%', backgroundColor: '#ffffff', boxShadow: "2px 2px 10px #5c5c5c" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>serviços</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List sx={{ width: '100%', backgroundColor: '#ffffff' }}>
                        <ListItem>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Work" secondary="Jan 7, 2014" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Vacation" secondary="July 20, 2014" />
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <HomeButton onClick={()=>{navigate('/')}}>
                <IoMdHome className='icon'/>
            </HomeButton>
        </>
    );
}

const HomeButton = styled.button`
    position: absolute;
    bottom: 5px;
    right: 5px;

    .icon {
        color: #000000;
        font-size: 26px;
    }
`