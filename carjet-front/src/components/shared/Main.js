import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export function MainApp() {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={"/"} replace />;
    }

    return (
        <Box sx={{ position:"fixed", top:"0", bottom:"0", left:"0", right:"0" }}>
            <Outlet />
        </Box>
    );
}