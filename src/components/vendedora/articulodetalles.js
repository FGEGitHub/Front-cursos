import { useState, useEffect } from "react";
import serviciovendedora from '../../services/vendedoras'


import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { useParams } from "react-router-dom"
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
////


import Box from '@mui/material/Box';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  

  


  
const Lotes = () => {
    //configuracion de Hooks
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [vista, setVista] = useState(true);
    const navigate = useNavigate();

    let params = useParams()
    let id = params.id
    

    const getClients = async () => {
        
        const clients = await serviciovendedora.listadeturnos(id)
   console.log(clients[0])
        setTurnos(clients)
        setLoading(false);
    }

 
    const borrarturno = async (id) => {
        console.log(id)
      const clients = await serviciovendedora.borrarturno(id)
      getClients()
  }


    useEffect(() => {
        getClients()
    }, [])

    ///
//opcionde click en el nombre




function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
  return (
   
   <>
    </>
  );
}






return (
    <>


    </>


)
}

export default Lotes;