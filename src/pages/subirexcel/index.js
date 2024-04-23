

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

import axios from 'axios';

export default function Paginas() {
    const navigate = useNavigate();
const theme = useTheme();

const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0]);
};

const handleUpload = async () => {
  try {
    const formData = new FormData();
    formData.append('excel', selectedFile);

    // Envía el archivo al servidor
    const response = await axios.post('http://localhost:4000/personas/subirexcel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Haz algo con la respuesta, por ejemplo, muestra los datos procesados
    alert(response.data);
  } catch (error) {
    console.error('Error al subir el archivo:', error);
  }
};

    const volver = (e) => {
        navigate('/fiscalizacion/administracion/menu')
        
        
            }
            const isMatch = useMediaQuery(theme.breakpoints.down("md"));
            return (
                <>


<div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Archivo</button>
    </div>



                </>
           
            );
        
        }