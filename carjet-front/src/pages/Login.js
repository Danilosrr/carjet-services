import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/shared/PasswordInput";
import useAuth from "../hooks/useAuth";
import api from "../services/api";



export default function Login() {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleInputChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        const { email, password } = formData;
        e.preventDefault();

        try {
            const { data: { token } } = await api.signIn({ email, password });
            console.log(token);
            signIn(token);
            navigate("/app/home");
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Box sx={{ position: "fixed", width: "100%", height: "100%", display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", justifyContent: "center"}} component="form" onSubmit={handleSubmit}>
        <Typography sx={{marginTop: "60px", marginBottom: "30px" }} variant="h4" component="h1">
          Login
        </Typography>
        <TextField name="email" sx={{ marginBottom: "16px", width: "80%" }} label="Email" type="email" variant="outlined" onChange={handleInputChange} value={formData.email}/>
        <PasswordInput name="password" sx={{ marginBottom: "16px", width: "80%" }} label="Senha" onChange={handleInputChange} value={formData.password}/>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
            <Link to="/" hidden>
                <Typography>Não possuo cadastro</Typography>
            </Link>
            <Button variant="contained" type="submit">
                Entrar
            </Button>
        </Box>
    </Box>
  );
}
