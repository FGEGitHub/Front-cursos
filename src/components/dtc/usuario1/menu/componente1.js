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
    backgroundImage:Logo,
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

const LoginForm = () => {
  const classes = useStyles();
  const [form, setForm] = useState({})
  const navigate = useNavigate();






  const isLogo = {
    width: "80%",
  };

  return (<>

   HOLA
    </>
  );
};

export default LoginForm;
