import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loginService from '../services/login';
import servicioUsuario from '../services/usuarios';
import Registro from "./Registro2";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Avatar,
  Link,
  Box
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const [usuario, setUsuario] = useState({ cuil_cuit: "", password: "" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hanleLogout = () => {
    setUser(null);
    servicioUsuario.setToken(null);
    window.localStorage.removeItem('loggedNoteAppUser');
  };

  const loginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await loginService.login({
        usuario: usuario.usuario,
        password: usuario.password
      });
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      servicioUsuario.setToken(user.token);
      setUser(user);
      setLoading(false);

      switch (user.nivel) {
        case 50: navigate('/fiscalizacion/administracion/menu'); break;
        case 8: navigate('/fiscalizacion/inscripcionadmin'); break;
        case 9: navigate('/fiscalizacion/encargados/carga'); break;
        case 10: navigate('/fiscalizacion/usuarioescuela/personas'); break;
        case 12: navigate('/fiscalizacion/movilidad/escuelas'); break;
        default: hanleLogout(); break;
      }
    } catch (error) {
      console.error(error);
      alert('Credenciales incorrectas');
      window.location.reload();
    }
  };

  const handleChange = (e) =>
    setUsuario({ ...usuario, [e.target.name]: e.target.value });

  return (
    <Box
      sx={{
        height: '100vh',
      //  background: 'linear-gradient(135deg, #3EDB63, #50D0F3, #A64FF2, #F04A3E, #F28C2D)',
  background: '#50D0F3',

        backgroundSize: '600% 600%',
        animation: 'gradientShift 10s ease infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card sx={{ width: 350, padding: 3, backgroundColor: '#ffffffdd', borderRadius: 4 }}>
        <Grid align="center">
          <Avatar sx={{ bgcolor: "#3EDB63", marginBottom: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" color="#3EDB63" gutterBottom>
            ¡Vamos Ctes!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Iniciar sesión
          </Typography>
        </Grid>

        <form onSubmit={loginSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Usuario"
            name="usuario"
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Contraseña"
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2, bgcolor: "#3EDB63", '&:hover': { bgcolor: '#34c657' } }}
          >
            {loading ? <CircularProgress color="inherit" size={24} /> : "Ingresar"}
          </Button>
        </form>

        <Typography align="center" sx={{ marginTop: 2 }}>
          <Link href="#" underline="hover">
            ¿Olvidaste tu contraseña?
          </Link>
        </Typography>

        <Typography align="center" sx={{ marginTop: 2 }}>
          ¿No estás registrado? <Registro />
        </Typography>
      </Card>

      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default Login;
