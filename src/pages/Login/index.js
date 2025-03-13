



import Navbar from '../../components/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../components/Login'
import React, { useEffect, useState } from "react";


export default function Paginas() {
    const navigate = useNavigate();
    const [loginVisible, setLoginvisible] = useState(false)

    useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        console.log(loggedUserJSON) 
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          switch (user.nivel) {
            case 1:
              navigate('/usuario/novedades')
           //   navigate('/')
              break;
            case 2:
              navigate('/administracion/callcenter')
              break;
          
            case 3:
              navigate('/coordinadores/cursos')
            //  navigate('/coordinadores/novedades')
              break;

              case 4:
                navigate('encargados/cursos')
              //  navigate('/encargados/cursos')
                break;
           
            default:
              window.localStorage.removeItem('loggedNoteAppUser')
              navigate('/loginn')
              
              break;
          }
        }
        setLoginvisible(true)
      }, [])

    return (
        <>
        {loginVisible ? <>
        <Navbar/>
        <Login/>
        </>:<></>}
        </>
   
    );

}