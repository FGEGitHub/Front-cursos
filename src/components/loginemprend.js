import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loginService from '../services/login';
import servicioUsuario from '../services/usuarios';
import {
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Paper
} from "@mui/material";
import logo from '../Assets/logoesme.webp'; // Asegurate que el archivo esté en esa ruta

const Login = () => {
  const [usuario, setUsuario] = useState({
    usuario: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const loginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const user = await loginService.login({
        usuario: usuario.usuario,
        password: usuario.password,
      });
      localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      servicioUsuario.setToken(user.token);
      setUser(user);

      switch (user.nivel) {
        case 1:
          navigate("/usuario/novedades");
          break;
        default:
          localStorage.removeItem("loggedNoteAppUser");
          navigate("/emprendedoras/login");
      }
    } catch (error) {
      alert("Credenciales incorrectas o error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        background: "#66BB44",
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      <Paper
        elevation={10}
        style={{
          padding: 30,
          maxWidth: 380,
          borderRadius: 16,
          background: "white",
        }}
      >
        <Grid align="center">
          <img
            src={logo}
            alt="Lista 47"
            style={{ width: "auto", height: 80, marginBottom: 10 }}
          />
          <Typography variant="h5" style={{ fontWeight: "bold", color: "#388E3C" }}>
            Lista 47 - Cuqui Calvano
          </Typography>
          <Typography variant="body2" style={{ marginBottom: 20, color: "#4CAF50" }}>
            Bienvenid@ emprendedora. Ingresá para continuar.
          </Typography>
        </Grid>
        <form onSubmit={loginSubmit}>
          <TextField
            fullWidth
            label="Usuario"
            name="usuario"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            name="password"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            value={usuario.password}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#66BB44",
              marginTop: 20,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Ingresar"}
          </Button>
        </form>
        <Typography
          variant="caption"
          display="block"
          align="center"
          style={{ marginTop: 20, color: "#388E3C" }}
        >
          Por una ciudad más justa. Juntas hacemos historia.
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
