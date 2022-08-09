import { Box } from "@mui/material";
import ExcelInput from "../components/shared/ExcelInput";
import Header from "../components/shared/Header";

export default function Assignments(){
    return(
        <Box sx={{position:'fixed', top:'0', bottom:'0', width:'100%'}}>
            <Header/>
            <Box sx={{position:'absolute', width: '100%', top:'65px', bottom:'0'}}>
                <ExcelInput/>
            </Box>
        </Box>
    )
}