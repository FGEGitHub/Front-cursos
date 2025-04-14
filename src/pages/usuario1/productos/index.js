

import React, { useEffect, useState, Fragment } from "react";
import Novedades from '../../../components/usuario1/planillacomponente/componente1'
import MenuUsuario from '../../../components/usuario1/Navbar1'


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
       <div style={styles.fondo}>{logueado ? <div>
        <MenuUsuario/>
        <br/>     <br/>     <br/>
        <Novedades/>


   


      </div> : <div></div>} </div>

    </>
  );

}

const styles = {
    fondo: {

      background: "linear-gradient(to bottom, #d4f4d2, #ffffff)", // Verde suave a blanco

    },
  };