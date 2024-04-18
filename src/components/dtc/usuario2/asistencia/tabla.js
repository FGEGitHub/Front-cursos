import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import servicioDtc from '../../../../services/dtc'
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Buscador from './buscador'
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
  const [usuario, setUsuario] = useState();
  useEffect(() => {
    traer()
    const fetchCurrentDate = () => {
      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      console.log(props.fecha)
      props.fecha == undefined ? setCurrentDate(formattedDate):setCurrentDate(props.fecha)
    };

    fetchCurrentDate();
  }, []);

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
   
      const user = JSON.parse(loggedUserJSON)
      setUsuario(user)
    
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    props.fecha == undefined ? setCurrentDate(formattedDate):setCurrentDate(props.fecha)
    
    const historial = await servicioDtc.traerpresentes(props.fecha == undefined ? {fecha:formattedDate,id:props.idt == undefined ? user.id:props.idt}:{fecha:props.fecha,id:props.idt == undefined ? user.id:props.idt})
   
console.log(historial)
    setDatos(historial)
    // 

};

const ausente = async (row) => {
  console.log(row)
  const ta = await servicioDtc.ponerpresente({fecha:row.fecha,id:row.id_usuario,id_tallerista:usuario.id})
  console.log(ta)
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
      { usuario ?  <>
        {usuario.nivel==21 || usuario.nivel==20 ?<>
      <Buscador
      chicos={datos[1]}
      fecha={currentDate}
      usuario={usuario}
      traer={async () => {
        const today = new Date();
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        props.fecha == undefined ? setCurrentDate(formattedDate):setCurrentDate(props.fecha)
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
   
      const user = JSON.parse(loggedUserJSON)
      setUsuario(user)
        const historial = await servicioDtc.traerpresentes(props.fecha == undefined ? {fecha:formattedDate,id:props.idt == undefined ? user.id:props.idt}:{fecha:props.fecha,id:props.idt == undefined ? user.id:props.idt})
    
    
        setDatos(historial)
        // 
    
    }}
      /></>:<></>}</>:<></>}
      <TableContainer>
                                    {!datos[0] ? <Skeleton /> : <>
                                        <h4>Lista de presentes ({datos[0].length}) </h4>
                                        Kid1:{datos[2].kid1}, Kid2:{datos[2].kid2}, Kid1:{datos[2].kid3}
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Dni</b></TableCell>
                                                    <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Quitar</b></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {datos[0].map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.apellido}  {row.nombre}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.dni} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.kid} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b><button  onClick={() => ausente(row)}>Quitar</button> </b> </StyledTableCell>



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
