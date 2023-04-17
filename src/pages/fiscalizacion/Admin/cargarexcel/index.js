


import Navbar from '../../../../components/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Subir from '../../../../components/fiscalizacion/admin/cargadeinscripciones/subir'
import Lista from '../../../../components/fiscalizacion/admin/cargadeinscripciones/tabla'
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
          if (user.nivel != 5 ){
            window.localStorage.removeItem('loggedNoteAppUser')
            navigate('/login')
      
          }else{
      
    
          }
        
          //servicioUsuario.setToken(user.token)  
         
          
        }else{
             window.localStorage.removeItem('loggedNoteAppUser')
          navigate('/login')
         
        }
       
      }, []) 
      
      
      
    const volver = (e) => {
        navigate('/fiscalizacion/administracion/menu')
        
        
            }

    return (
        <>
        <Navbar/>
        <br/>     <br/>  <br/>     <br/>  
        <Button onClick={volver}>Volver</Button> <br/>     <br/>     
        <Subir/><br/>
        <Lista/>
        </>
   
    );

}