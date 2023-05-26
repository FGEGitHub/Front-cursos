
import { useNavigate, useParams } from "react-router-dom";
import Steper from '../../../../components/fiscalizacion/usuariosescuelas/asignados/tabla'

import React, { useEffect, useState } from "react";
import {
    Button,
 
  } from "@mui/material";

export default function Paginas() {
    const navigate = useNavigate();

    useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
          
        if (loggedUserJSON) {
          
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          console.log(user.nivel)
          if (user.nivel != 10 ){
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
     
    
        <br/>     <br/>  <br/>     <br/>  
     <Steper/>
  
        </>
   
    );

}