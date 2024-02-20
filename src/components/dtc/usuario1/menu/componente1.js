import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
import CardInformacionDia from './tarjetahoy';
import CardSeleccionFecha from './tarjetaselecionar';

//import   Navbar from "../navbar"

//import Registro from "./registro"

//import servicioUsuario from "../../services/usuario"
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#607d8b', // Cambiar el color de fondo aquí
    padding: theme.spacing(2),

    borderRadius: theme.spacing(2),
    color: 'white'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'white', // Cambiar el color de fondo del avatar aquí
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const handleFechaSeleccionada = (fecha) => {
  // Manejar la fecha seleccionada, por ejemplo, navegar a actividades con la fecha
  console.log('Fecha seleccionada:', fecha);
};
const LoginForm = () => {
  const classes = useStyles();
  const [form, setForm] = useState({})
  const navigate = useNavigate();

  const fechaActual = new Date(); 




  const isLogo = {
    width: "80%",
  };

  return (<>

<CardInformacionDia fecha={fechaActual} />
<CardSeleccionFecha onFechaSeleccionada={handleFechaSeleccionada} />
    </>
  );
};

export default LoginForm;
