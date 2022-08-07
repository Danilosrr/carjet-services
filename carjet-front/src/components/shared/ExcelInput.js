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


    async function importExcel(file){
        setLoading(true);
        try {
            const upload = await api.sendFile(file,token);
            setList(upload.data)
            console.log(upload,list);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // upload.data will be the database response not the json parse, id == database id

    const columns = [
        { id:2, field: 'Code', headerName: 'id', width: 70 },
        { id:3, field: 'Product Name', headerName: 'Product Name', width: 130 },
        { id:4, field: 'Specification', headerName: 'Specification', width: 130 },
        { id:5, field: 'Quantity', headerName: 'Quantity', width: 130 },
        { id:6, field: 'Reporter', headerName: 'Reporter', width: 130 },
        { id:7, field: 'Summary', headerName: 'Summary', width: 130 },
    ]

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
                    columns={columns}
                    checkboxSelection
                />:<></>}
            </Box>
        </Box>
    )
}