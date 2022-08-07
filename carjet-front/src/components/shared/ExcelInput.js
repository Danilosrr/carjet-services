import { Box, Button } from "@mui/material"
import { SiMicrosoftexcel } from "react-icons/si";
import { read, readFile, utils, writeFileXLSX, writeXLSX } from 'xlsx';
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

export default function ExcelInput(){
    const { token } = useAuth();

    async function importExcel(file){
        try {
            await api.sendFile(file,token)
            console.log(file);  
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Box display={'flex'} justifyContent={'center'} marginTop={'20px'}>
            <Button sx={{gap: '10px'}} variant="contained" component="label">
                <SiMicrosoftexcel fontSize={'26px'}/>
                    Upload
                <input hidden type="file" accept=".xlsx, .xls, .csv" onChange={(e)=>{ const file = e.target.files[0]; importExcel(file) }}/>
            </Button>
        </Box>
    )
}