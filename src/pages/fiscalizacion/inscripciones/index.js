

import Navbar from '../../../components/fiscalizacion/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Formulario from '../../../components/fiscalizacion/componenteinscrip'
import React, { useEffect, useState } from "react";
import {
    Button,
 
  } from "@mui/material";

export default function Paginas() {
    const navigate = useNavigate();


    const volver = (e) => {
        navigate('/fiscalizacion/administracion/menu')
        
        
            }

    return (
        <>
        <Navbar/>
        <br/>     <br/>  <br/>     <br/>  
        <Formulario/>
        </>
   
    );

}