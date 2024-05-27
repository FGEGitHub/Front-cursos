

import { useNavigate, useParams } from "react-router-dom";
import Formulario from '../../components/componenteinscripcion/componente2'
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
useEffect(() => {
    document.title = "Cuqui Calvano";
  }, []);

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