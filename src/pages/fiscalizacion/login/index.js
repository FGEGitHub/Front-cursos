





import Navbar from '../../../components/fiscalizacion/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../../components/login2'
import React, { useEffect, useState } from "react";


export default function Paginas() {
    const navigate = useNavigate();


    useEffect(() => {
        console.log('htgdj') 
          const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
          console.log(loggedUserJSON) 
          if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            switch (user.nivel) {
              case 5:
                navigate('/fiscalizacion/administracion/menu')
                break;
             
              default:
                window.localStorage.removeItem('loggedNoteAppUser')
                navigate('/fiscalizacion/login')
                
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