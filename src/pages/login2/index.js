



import Navbar from '../../components/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../components/login2'
import React, { useEffect, useState } from "react";


export default function Paginas() {
    const navigate = useNavigate();


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          switch (user.nivel) {
            case 1:
              navigate('/usuario/novedades')
              break;
            case 2:
              navigate('/administracion/cursos')
              break;
          
            case 3:
              navigate('/profesores/novedades')
              break;

              case 4:
                navigate('/encargados/cursos')
                break;
           
            default:
              
              break;
          }
        }
      }, [])

    return (
        <>
        <Navbar/>
        <Login/>
        </>
   
    );

}