



import Navbar from '../../../components/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../../components/loginemprend'
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
           
            default:
              window.localStorage.removeItem('loggedNoteAppUser')
              navigate('/emprendedoras/login')
              
              break;
          }
        }
        setLoginvisible(true)
      }, [])

    return (
        <>
        {loginVisible ? <>
   
        <Login/>
        </>:<></>}
        </>
   
    );

}