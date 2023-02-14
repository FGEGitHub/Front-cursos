import React, { useEffect, useState, Fragment } from "react";

import MenuUsuario from '../../../components/usuario1/Menuizq1'
import Cursos from '../../../components/usuario1/cursos/listacursosniv1'


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
      <div>  {logueado ? <div>
        <MenuUsuario>
        <Cursos/>

 </MenuUsuario> 
   


      </div> : <div></div>} </div>

    </>
  );

}