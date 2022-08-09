import { Box, Button, MenuItem, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Header from "../components/shared/Header";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

export default function Stock(){
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
    },[])

    
    async function getStock(){
        setLoading(true);
        try {
            const query = await api.getStock(provider,token);
            console.log(provider,query)
            setList(query.data);
            if(query.data.length>0){
                setColumn(createColumns(query.data[0]));
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

    return(
        <Box sx={{position:'fixed', top:'0', bottom:'0', width:'100%'}}>
            <Header/>
            <Box sx={{position:'absolute', width: '100%', top:'65px', bottom:'0'}}>
                <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'} marginTop={'20px'} height={'100%'}>
                    <Box display={'flex'} gap={'10px'} flexDirection={'column'} height={'120px'} justifyContent={'start'}>
                        {!!providers?
                            <TextField select sx={{ width: '150px' }} label="estoque"  onChange={handleInputChange} value={provider}>
                                    {providers.map(provider => <MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>)}
                            </TextField>
                        :<></>}
                        <Button sx={{gap: '10px', height: 'fit-content', marginBottom: '20px', padding: '10px'}} variant="contained" component="label">
                            <IoMdSearch fontSize={'26px'}/>
                                Vizualizar
                            <button hidden onClick={getStock} disabled={(loading || !provider)}/>
                        </Button>
                    </Box>
                    <Box height={'70%'} width={'95%'} >
                        {list.length>0?
                        <DataGrid
                            rows={list}
                            columns={column}
                            checkboxSelection
                        />:<></>}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}