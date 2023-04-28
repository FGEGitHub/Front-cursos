import { useState, useEffect } from "react";
import servicioFisca from '../../../services/fiscalizacion'
import { Paper } from '@mui/material';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#311b92",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor:"#7c9c99"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Estracto = () => {
    //configuracion de Hooks
    const [usuario, setUsuario] = useState([''])
    const [loading, setLoading] = useState(true);
    const [escuelas, setEscuelas] = useState([''])
    const [fecha, setFecha] = useState([''])
    const [vista, setVista] = useState(false);
    const navigate = useNavigate();

    const getClients = async () => {

  

            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)
                console.log(usuario)
                setUsuario(usuario)
                setFecha({id_aliado:usuario.id})
 const clients = await servicioFisca.traerincripcionesdealiado(usuario.id)
          setEscuelas(clients)
            }
           
          
            setLoading(false);

    }

    useEffect(() => {
        getClients()
    }, [])
    const handleChange = (e) => {

console.log(fecha)
        // setPago({ ...pago, ['id']: props.id })
        setFecha({ ...fecha, [e.target.name]: e.target.value })


    }

    ///
    //opcionde click en el nombre

    //
    const cambiarvista =  () => {
        setVista(!vista)


    }

    
    const Inscribir = async (event) => {
     
    
        const rta=  await servicioFisca.enviarinscripcionadmin(
            fecha
         )
     
        alert(rta)
           if (rta ==="inscripto correctamente"){
            window.location.reload();
        }
     
        
      };




    // renderiza la data table
    return (
        <>
            <Paper
                sx={{
                    cursor: 'pointer',
                    background: '#fafafa',
                    color: '#bdbdbd',
                    border: '1px dashed #ccc',
                    '&:hover': { border: '1px solid #ccc' },
                    padding: 10,
                    //  height: '70vh',
                    width: 380,
                    margin: "20px auto"
                }}
            >
            <Card sx={{  textAlign: 'center'  }}>
            <AccountBalanceTwoToneIcon/>
                  <h2>INSCRIPCION A FISCALIZACION  </h2>
                  usuario: {usuario ? <>{usuario.usuario}</>:<></> }
                 </Card>
                
               
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre "
                    name="nombre"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                />
              
              <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Apellido"
                    name="apellido"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="DNI"
                    name="dni"
                    onChange={handleChange}
                    fullWidth
                    type="number"
                    variant="standard"
                />
                     <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Telefono"
                    name="telefono"
                    onChange={handleChange}
                    fullWidth
                    type="number"
                    variant="standard"
                />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Telefono alternativo"
                    name="telefono2"
                    onChange={handleChange}
                    fullWidth
                    type="number"
                    variant="standard"
                />

             
                        <br/><InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Datos de la persona que recomendo
                </InputLabel>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Apellido referido"
                    name="apellido_referido"
                    onChange={handleChange}
                    fullWidth
                   
                    variant="standard"
                />
                   <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre referido"
                    name="nombre_referido"
                    onChange={handleChange}
                    fullWidth
                   
                    variant="standard"
                />
                <CardActions>
                    {fecha.nombre && fecha.telefono? <>     <Button variant="outlined"
                          onClick={() => Inscribir()}
                      >  Enviar inscripcion</Button> </>: <>     <Button variant="outlined" disabled
                      onClick={() => Inscribir()}
                  >  Enviar inscripcion</Button> </>}
          
                       </CardActions>
                
          
            </Paper>

            {vista ?  <>
                <Button variant="contained" onClick={cambiarvista} >OCULTAR INSCRIPTOS <RemoveRedEyeIcon/></Button>
                {escuelas.length > 0 ?  <> 
            <TableContainer>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>DNI </b> <b /></TableCell>
                               
                                <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>APELLIDO</b></TableCell>

                                <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>NOMBRE</b></TableCell>
                                <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>TELEFONO</b></TableCell>
                                <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>TELEFONO2</b></TableCell>




                            </TableRow>
                        </TableHead>
                        <TableBody>


                            {escuelas ? <>
                                {escuelas.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">{row.dni}</StyledTableCell>
                                       
                                        <StyledTableCell component="th" scope="row"><b>{row.apellidoo}</b></StyledTableCell>

                                        <StyledTableCell component="th" scope="row">{row.nombree}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row"> {row.telefono}  </StyledTableCell>
                                        <StyledTableCell component="th" scope="row"> {row.telefono2}  </StyledTableCell>
                                        {/*  <StyledTableCell component="th" scope="row">{row.presente === null ? <>Sin registrar</> : <> {row.row.presente === 'presente' ? <>PRESENTE</> : <>AUSENTE</>} </>}</StyledTableCell> */}
                                       

                                    </StyledTableRow>
                                ))}

                            </> : <> <StyledTableCell component="th" scope="row">No hay inscriptos</StyledTableCell> </>}


                        </TableBody>
                    </Table>


                </TableContainer>
                </> : <> NO HAY INSCRIPTOS  </>}
                </>: <>
                <Button variant="contained" onClick={cambiarvista} >VER INSCRIPTOS <RemoveRedEyeIcon/></Button> </>} 
                <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>
        </>


    )
}

export default Estracto;