


import Navbar from '../../../../components/fiscalizacion/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../../../components/fiscalizacion/admin/menu/cards'
import React, { useEffect, useState } from "react";


export default function Paginas() {
    const navigate = useNavigate();

    useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
          
        if (loggedUserJSON) {
          
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          console.log(user.nivel)
          if (user.nivel != 5 ){
            window.localStorage.removeItem('loggedNoteAppUser')
            navigate('/fiscalizacion/login')
      
          }else{
      console.log('Bienvenido')
    
          }
        

          
        }else{
             window.localStorage.removeItem('loggedNoteAppUser')
          navigate('/fiscalizacion/login')
         
        }
       
      }, []) 
    



    return (
        <>
        <Navbar/>
        <br/>     <br/>     <br/>
        <Login/>
        </>
   
    );

}