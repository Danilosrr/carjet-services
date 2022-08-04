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
import Header from '../components/shared/Header';

export default function Assignments() {
    return (
        <>
            <Header/>
            <Accordion sx={{ width: '100%', backgroundColor: '#ffffff', position:'absolute', top:'65px' }} disableGutters>
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
        </>
    );
}