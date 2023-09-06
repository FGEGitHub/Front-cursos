

import { useNavigate, useParams } from "react-router-dom";
import Formulario from '../../components/componenteinscripcion/formulario'
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
      <div >
<br/>
        <Formulario/>
        
        </div>
        </>
   
    );

}