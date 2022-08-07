import { Box, Button } from "@mui/material"
import { useState } from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import { DataGrid } from '@mui/x-data-grid';
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

export default function ExcelInput(){
    const { token } = useAuth();
    const [loading,setLoading] = useState(false);
    const [list,setList] = useState([]);
    const [column,setColumn] = useState([]);


    async function importExcel(file){
        setLoading(true);
        try {
            const upload = await api.sendFile(file,token);
            setColumn(createColumns(upload.data[0]));
            setList(upload.data);
            console.log(upload,list);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // upload.data will be the database response not the json parse, id == database id

    function createColumns(data){
        const fields = Object.keys(data)
        const columns = fields.map((key,i) => {
            return (
                {id:i, field:key, headerName:key, flex: 1}
            )
        });
        return columns
    }


    return(
        <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'} marginTop={'20px'} height={'100%'}>
            <Button sx={{gap: '10px', height: 'fit-content', marginBottom: '20px'}} variant="contained" component="label" disabled={loading}>
                <SiMicrosoftexcel fontSize={'26px'}/>
                    Upload
                <input hidden type="file" name="table" accept=".xlsx, .xls, .csv" onChange={(e)=>{ const file = e.target.files[0]; importExcel(file) }}/>
            </Button>
            <Box height={'100%'} width={'100%'} >
                {list.length>0?
                <DataGrid
                    rows={list}
                    columns={column}
                    checkboxSelection
                />:<></>}
            </Box>
        </Box>
    )
}