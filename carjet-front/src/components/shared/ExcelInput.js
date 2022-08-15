import { Box, Button, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import { DataGrid } from '@mui/x-data-grid';
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

export default function ExcelInput(){
    const { token } = useAuth();
    const [loading,setLoading] = useState(false);
    const [list,setList] = useState([]);
    const [column,setColumn] = useState([]);
    const [provider,setProvider] = useState(0);
    const [providers,setProviders] = useState(null);

    useEffect(() => {
        async function loadPage() {
            if (!token) return;
    
            const { data: providers } = await api.getProviders(token);
            setProviders(providers);
        }
        loadPage();
    },[token])

    async function importList(){
        setLoading(true);
        try {
            const newList = list;
            const format  = newList.map(row => { delete row.id; return { ...row } });
            api.sendList(list,token);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function importExcel(file){
        setLoading(true);
        try {
            const upload = await api.sendFile(file,provider,token);
            setList(createRows(upload.data));
            if(upload.data.length>0){
                setColumn(createColumns(upload.data[0]));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    function handleInputChange(e) {
        setProvider(e.target.value);
    }
    
    function createColumns(data){
        const fields = Object.keys(data)
        const columns = fields.map((key,i) => {
            return (
                {id:i, field:key, headerName:key, flex: 1}
            )
        });
        return columns
    }
    function createRows(data){
        const rows = data.map((row,i) => ({...row, id:i}));
        return rows
    }


    return(
        <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'} marginTop={'20px'} height={'100%'}>
            <Box display={'flex'} gap={'10px'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                {!!providers?
                    <TextField select sx={{ width: '150px' }} label="estoque"  onChange={handleInputChange} value={provider}>
                            {providers.map(provider => <MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>)}
                    </TextField>
                :<></>}
                <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
                    <Button sx={{gap: '10px', height: '40px', marginBottom: '20px', padding: '10px'}} variant="contained" component="label" >
                        <SiMicrosoftexcel fontSize={'26px'}/>
                            Upload
                        <input hidden type="file" name="table" accept=".xlsx, .xls, .csv" onChange={(e)=>{ const file = e.target.files[0]; importExcel(file) }} disabled={(loading || !provider)}/>
                    </Button>
                    <Box hidden={!(list.length>0)}>
                        <Button sx={{ height: '40px', marginBottom: '20px'}} variant="contained" onClick={importList}>Cadastrar</Button>
                    </Box>
                </Box>
            </Box>
            <Box height={'70%'} width={'100%'} >
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