

import { useNavigate, useParams } from "react-router-dom";
import Formulario from '../../components/componenteinscripcion/formulario'
import React, { useEffect, useState } from "react";
import {
    Button,
 
  } from "@mui/material";
  import {
    useMediaQuery,
    useTheme,
} from "@mui/material";

export default function Paginas() {
    const navigate = useNavigate();
const theme = useTheme();

    const volver = (e) => {
        navigate('/fiscalizacion/administracion/menu')
        
        
            }
            const isMatch = useMediaQuery(theme.breakpoints.down("md"));
            return (
                <>
                     {isMatch ? <>
              <div className="backgroundinscrmobile" >
        <br/>
                <Formulario/>
                
                </div>
                </>:<> <div className="backgroundinscr" >
        <br/>
                <Formulario/>
                
                </div></>}
                </>
           
            );
        
        }