import { Box, Input } from "@mui/material"
import { SiMicrosoftexcel } from "react-icons/si";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

export default function ExcelInput(){
    const { token } = useAuth();

    async function importExcel(file){
        try {
            const upload = await api.sendFile(file,token)
            console.log(file,upload);
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Box display={'flex'} justifyContent={'center'} marginTop={'20px'}>
            <form target="_blank" method="post" enctype="multipart/form-data">
                <input type="file" name="table" accept=".xlsx, .xls, .csv"/>
                <input formaction="http://localhost:4000/upload" type="submit"/>
            </form>
        </Box>
    )
}