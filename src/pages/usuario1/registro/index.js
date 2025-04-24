

import React, { useEffect, useState, Fragment } from "react";
import Novedades from '../../../components/usuario1/registro'
import MenuUsuario from '../../../components/usuario1/Navbar1'
import Gnancia from '../../../components/usuario1/tarjetaganancia'


import { useNavigate } from "react-router-dom";




export default function Transferencias() {
  const [usuarioo, setUsuarioo] = useState([''])

  //setUsuarioo(usuario)


  const navigate = useNavigate();
  const [logueado, setLogueado] = useState(false)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (!user) {
        window.localStorage.removeItem('loggedNoteAppUser')
        navigate('/login')

      } else {

        setLogueado(true)
      }

      //servicioUsuario.setToken(user.token)  


    }

  }, [])

  return (
    <>
       <div style={styles.fondo}>
      
        <br/>     <br/>     <br/>
        <Novedades/>




    </div>

    </>
  );

}

const styles = {
    fondo: {

      background: "linear-gradient(to bottom, #d4f4d2, #ffffff)", // Verde suave a blanco

    },
  };