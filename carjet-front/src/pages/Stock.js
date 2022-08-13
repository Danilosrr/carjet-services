import { Box, Button, MenuItem, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Header from "../components/shared/Header";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import formatDate from "../services/dateFormat";

export default function Stock(props){
    const { stock } = props
    const { token } = useAuth();
    const [loading,setLoading] = useState(false);
    const [list,setList] = useState([]);
    const [column,setColumn] = useState([]);
    const [option,setOption] = useState(0);
    const [options,setOptions] = useState(null);

    useEffect(() => {
        async function loadPage() {
            if (!token) return;
            setList([]); setOption(0);

            if (stock) {
                const { data: options } = await api.getProviders(token);
                setOptions(options);
            } else {
                const { data: options } = await api.getBranches(token); 
                setOptions(options);
            }
        }
        loadPage();
    },[stock,token])

    
    async function getInfo(){
        setLoading(true);
        try {
            if (stock) {
                const query = await api.getStock(option,token);
                if (query.data) { query.data.forEach(row => {row.createdAt = formatDate(row.createdAt)}); }
                setList(query.data);
                if(query.data.length>0){ setColumn(createColumns(query.data[0])) }
                setLoading(false);
            } else {
                const query = await api.getServices(option,token);
                if (query.data) { query.data.forEach(row => {
                    row.createdAt = formatDate(row.createdAt); 
                    row.closedAt = formatDate(row.closedAt); 
                }); }
                setList(query.data);
                if(query.data.length>0){ setColumn(createColumns(query.data[0])) }
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    
    function handleInputChange(e) {
        setOption(e.target.value);
    }

    function createColumns(data){
        const fields = Object.keys(data)
        const columns = fields.map((key,i) => {
            let visibility = false;
            if (key === 'id') visibility = true
            if (key === 'providerId') visibility = true
            
            return (
                {id:i, field:key, headerName:key, flex: 1, hide: visibility}
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
                        {!!options?
                            <TextField select sx={{ width: '150px' }} label={stock?"estoque":"filial"}  onChange={handleInputChange} value={option}>
                                    {options.map(option => <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>)}
                            </TextField>
                        :<></>}
                        <Button sx={{gap: '10px', height: 'fit-content', marginBottom: '20px', padding: '10px'}} variant="contained" component="label">
                            <IoMdSearch fontSize={'26px'}/>
                                Vizualizar
                            <button hidden onClick={getInfo} disabled={(loading || !option)}/>
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