import { Box, Button } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from "../../hooks/useAuth";

const sxbutton = { 
    display:'flex', 
    justifyContent:'flex-start', 
    backgroundColor: "#ffffff", 
    position: "absolute", 
    bottom: "15px", 
    right: "15px" 
}

export function MainApp() {
    const navigate = useNavigate();
    const { token, signOut } = useAuth();

    if (!token) {
        return <Navigate to={"/"} replace />;
    }

    function handleSignOut() {
        navigate("/");
        signOut();
    }

    return (
        <Box sx={{ position:"fixed", top:"0", bottom:"0", left:"0", right:"0" }}>
            <Outlet />
            <Box sx={sxbutton}>
                <Button sx={{ color:'#000000' }} onClick={handleSignOut} startIcon={<LogoutIcon sx={{ color: "#000000", fontSize: "26px"}}/>}>Logout</Button>
            </Box>
        </Box>
    );
}