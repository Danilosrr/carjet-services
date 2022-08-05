import * as React from 'react';
import {
    Box,
    Divider,
    Typography,
} from "@mui/material";
import Header from '../components/shared/Header';
import TaskList from '../components/Table';

export default function Assignments() {
    return (
        <Box sx={{position:'fixed', top:'0', bottom:'0', width:'100%'}}>
            <Header/>
            <Box sx={{position:'absolute', width: '100%', top:'65px', bottom:'0'}}>
                <Divider sx={{width: '100%', color: '#000000'}}/>
                <Box>
                    <Typography variant="h5" component="h5" align="center">serviços</Typography>
                </Box>
                <Divider sx={{width: '100%', color: '#000000'}}/>
                <TaskList/>
            </Box>
        </Box>
    );
}