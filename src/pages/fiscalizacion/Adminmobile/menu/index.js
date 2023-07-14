

import Navbar from '../../../../components/fiscalizacion/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Formulario from '../../../../components/fiscalizacion/adminmobile/consultas'
import React, { useEffect, useState } from "react";
import {
    Button,
 
  } from "@mui/material";

export default function Paginas() {
    const navigate = useNavigate();

   /*  useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
          
        if (loggedUserJSON) {
          
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          console.log(user.nivel)
          if (user.nivel != 7 ){
            window.localStorage.removeItem('loggedNoteAppUser')
            navigate('/fiscalizacion/login')
      
          }else{
      console.log('Bienvenido')
    
          }
        

          
        }else{
             window.localStorage.removeItem('loggedNoteAppUser')
          navigate('/fiscalizacion/login')
         
        }
       
      }, [])  */

    return (
        <>
        <Navbar/>
        <br/>     <br/>  <br/>     
      <Formulario/>
        </>
   
    );

}