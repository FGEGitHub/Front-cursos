import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioFide from '../../../../services/fiscalizacion'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
const currencies = [
  {
    value: 'CBU',
    label: 'CBU N°1',
  },
  {
    value: 'CBU',
    label: 'CBU N°2',
  },


  
];

export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  let params = useParams()
  let id_curso = params.id
  const [usuarioo, setUsuarioo] = useState()
  const [cargandomesas, setCargandomesas] = useState(false)
  const [datos, setDatos] = useState()
  const [mesas, setMesas] = useState()
  const [activo, setActivo] = useState(false)





  const [inscripcion, setInscripcion] = useState({


})


  const handleClickOpen = async () => {
    await traer()
    setOpen(true);
    setInscripcion(({

  

      id:props.id,
      nombre:props.nombre,
      circuito:props.circuito,
     
  
  
    }))
    setActivo(true)
  }

  const handleClose = () => {
    setActivo(false)
    setOpen(false);
  };

  const traer = async () => {
  
    const datod = await servicioFide.traerdetallesdeunaescuela(props.id)
    console.log(datod)
    setDatos(datod)


  }



  ////
  
  const [currency, setCurrency] = React.useState('EUR');

  /*   const handleChange = (event) => {
      setCurrency(event.target.value);
    }; */


  return (


    
    
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       < Tooltip title="Mdificar">
      <Button onClick={handleClickOpen}> Ver escuela </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

      {activo ? <>
        <DialogContent>


       { props.id}
             <h3  style={{ color: 'crimson' }} >Datos de escuela {props.nombre} </h3>
            
            
             
              
  {datos ? <>

                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>numero</TableCell>
            
            <TableCell align="right">Fiscal</TableCell>
            <TableCell align="right">dni</TableCell>
            <TableCell align="right">Presente</TableCell>
            <TableCell align="right">Tel</TableCell>
     
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.numero}
              </TableCell>
             
             
              <TableCell align="left">{row.apellido} {row.nombrepers}</TableCell>
              <TableCell align="left">{row.dni}</TableCell>
              <TableCell align="left">{row.dato1}</TableCell>
              <TableCell align="left">{row.telefono}</TableCell>
                         </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


              
                    {datos.map((row) => (
                            
                            <option value={row.id}> {row.nombre}</option>
         
                  ))}</>:<></>}
           



               

                 <DialogActions>
           


          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cerrar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   
  );
}
