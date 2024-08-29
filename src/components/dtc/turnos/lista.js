import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import servicioDtc from '../../../services/dtc'
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Buscador from './buscador'
import Asignar from './asignar'
import Calend from './calendario'
import Skeleton from '@mui/material/Skeleton';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const MobileFriendlyTable = (props) => {
  const [currentDate, setCurrentDate] = useState('');
  const [datos, setDatos] = useState();
  const [fecha, setFecha] = useState();
  const [usuario, setUsuario] = useState();

  const [fechaSeleccionada, setFechaSeleccionada] = useState('');  
  useEffect(() => {
    traer();
  }, [fechaSeleccionada]);

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
   
      const user = JSON.parse(loggedUserJSON)
      setUsuario(user)
    
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    props.fecha == undefined ? setCurrentDate(formattedDate):setCurrentDate(props.fecha)
    
    const historial = await servicioDtc.traerparaturnos(props.fecha == undefined ? {fecha:formattedDate,id:props.idt == undefined ? user.id:props.idt}:{fecha:props.fecha,id:props.idt == undefined ? user.id:props.idt})
   
console.log(historial)
    setDatos(historial)
    // 

};

const ausente = async (row) => {
  console.log(row)
  const ta = await servicioDtc.sacarturno({id:row.id})
alert(ta)
   // Aquí puedes realizar la llamada al backend utilizando algún servicio o librería
   // Ejemplo: axios.post('/api/backend', { selectedValue });
   traer()
}
  return (
    <div>    
        {datos ? <>
      <Typography variant="p" gutterBottom>
        Fecha: {currentDate}
      </Typography>
   <Calend
    traer={traer}
    onDateSelect={(fecha) => setFechaSeleccionada(fecha)}/>
      <Buscador
      chicos={datos[1]}
      fecha={currentDate}
      usuario={usuario}
      traer={ async (fecha) => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
       
          const user = JSON.parse(loggedUserJSON)
          setUsuario(user)
        
        const today = new Date();
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    
        props.fecha == undefined ? setCurrentDate(formattedDate):setCurrentDate(props.fecha)
        
        const historial = await servicioDtc.traertodoslosturnosfecha( fecha)

       
    console.log(historial)
        setDatos(historial)
        setFecha(fecha)
        // 
    
    }}
      />
      <TableContainer>
                                    {!datos[0] ? <Skeleton /> : <>
                                  
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Estado</b></TableCell>
                                                  



                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Horario</b></TableCell>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Psicologo</b></TableCell>

                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Asignar</b></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {datos[0].map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.apellido ?<>{row.apellido}  {row.nombre}</>: <>Disponible</> } </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.estado} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.detalle} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.nombrepsiq} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b><Asignar
                                                        id={row.id}
                                                              chicos={datos[1]} 
                                                             traer= { async () => {
                                                               /// const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                                               
                                                             ///     const user = JSON.parse(loggedUserJSON)
                                                               ///   setUsuario(user)
                                                                
                                                              //  const today = new Date();
                                                               // const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
                                                            
                                                              //  props.fecha == undefined ? setCurrentDate(formattedDate):setCurrentDate(props.fecha)
                                                                
                                                                const historial = await servicioDtc.traertodoslosturnosfecha( fecha)
                                                               
                                                            console.log(historial)
                                                                setDatos(historial)
                                                                // 
                                                            
                                                            }}
                                                /></b> </StyledTableCell>



                                                    </StyledTableRow>
                                                ))}




                                            </TableBody>
                                        </Table>
                                    </>}

                                </TableContainer>
      </>:<></>}
      
      <br/>  <br/>  <br/>  <br/>  <br/></div>
  );
};

export default MobileFriendlyTable;
