


import Navbar from '../../../../components/fiscalizacion/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Subir from '../../../../components/fiscalizacion/admin/cargaddeEscuelas/subir'
import Lista from '../../../../components/fiscalizacion/admin/cargaddeEscuelas/tabla'
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
        <Button onClick={volver}>Volver</Button> <br/>     <br/>     
        <Subir/><br/>
        <Lista/>
        </>
   
    );

}