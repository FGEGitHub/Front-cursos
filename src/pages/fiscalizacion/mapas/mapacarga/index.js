

import { useNavigate, useParams } from "react-router-dom";
import Formulario from '../../../../components/fiscalizacion/admin/mapas/mapaleafed'
//import Formulario from '../../components/componenteinscripcion/cerrado'

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
  
      // Actualiza las etiquetas meta de Open Graph para WhatsApp
      updateMeta('og:CCARI', 'Cuqui Calvano - ESME');
      updateMeta('og:CCARI', 'Cuqui Calvano - ESME');
      updateMeta('og:image', '../../Assets/logocoalicion.png'); // Asegúrate de que la ruta sea correcta
  
      // Opcionalmente, puedes actualizar otras etiquetas
      updateMeta('og:url', window.location.href);
      updateMeta('og:type', 'website');
  }, []);

    const volver = (e) => {
        navigate('/fiscalizacion/administracion/menu')
        
        
        
            }
            const isMatch = useMediaQuery(theme.breakpoints.down("md"));
            return (
                <>
                   <Formulario/>
                </>
           
            );
        
        }