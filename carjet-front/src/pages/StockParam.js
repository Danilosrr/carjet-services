import { Box, Button, MenuItem, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/shared/Header";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import formatDate from "../services/dateFormat";

export default function StockParam(){
    const { token } = useAuth();
    const [list,setList] = useState([]);
    const [column,setColumn] = useState([]);
    const [provider,setProvider] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function loadPage() {
            if (!token) return;
    
            getStock();
            getProvider();
        }
        loadPage();
    },[])

    async function getProvider(){
        try {
            const { data: provider } = await api.getProvider(id,token);
            setProvider(provider);
        } catch (error) {
            console.log(error);
        }
    }

    async function getStock(){
        try {
            const query = await api.getStock(id,token);
            if (query.data) { query.data.forEach(row => {row.createdAt = formatDate(row.createdAt)}); }
            setList(query.data);
            if(query.data.length>0){
                setColumn(createColumns(query.data[0]));
            }
        } catch (error) {
            console.log(error);
        }
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
            <Box sx={{position:'absolute', width: '100%', top:'65px', bottom:'0', textAlign:'center'}}>
                {list.length>0?<h2 style={{fontWeight: 700}}>{`${provider.name}`}</h2>:<></>}
                <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'} marginTop={'20px'} height={'100%'}>
                    <Box height={'calc( 100% - 65px )'} width={'95%'} >
                        {list.length>0?
                        <DataGrid
                            rows={list}
                            columns={column}
                            checkboxSelection
                        />:<p>{`Estoque "${provider.name}" vazio`}</p>}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}