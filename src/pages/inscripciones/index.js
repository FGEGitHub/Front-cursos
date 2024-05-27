

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
    const updateMeta = (property, content) => {
        let element = document.querySelector(`meta[property='${property}']`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('property', property);
          document.getElementsByTagName('head')[0].appendChild(element);
        }
        element.setAttribute('content', content);
      };
  
      updateMeta('og:CCARI', 'Cuqui Calvano - ESME');
      updateMeta('og:CCARI', 'Escuela d Mujeres Emprendedoras');
      updateMeta('og:image', '../../Assets/logocoalicion.png');
      updateMeta('twitter:CCARI', 'Cuqui Calvano - ESME');
      updateMeta('twitter:CCARI', 'Escuela d Mujeres Emprendedoras');
      updateMeta('twitter:image', '../../Assets/logocoalicion.png');
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