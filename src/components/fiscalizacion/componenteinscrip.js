import { useState, useEffect } from "react";
import servicioFisca from '../../services/fiscalizacion'
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

//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Estracto = () => {
    //configuracion de Hooks
    const [dats, setDats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [escuelas, setEscuelas] = useState([''])
    const [fecha, setFecha] = useState([''])
    const [activo, setActivo] = useState(false);
    const navigate = useNavigate();

    const getClients = async () => {

        const clients = await servicioFisca.traerescuelas({

        })
        setEscuelas(clients)
        setLoading(false);
    }

    useEffect(() => {
        getClients()
    }, [])
    const handleChange = (e) => {


        // setPago({ ...pago, ['id']: props.id })
        setFecha({ ...fecha, [e.target.name]: e.target.value })


    }

    ///
    //opcionde click en el nombre

    //

    
    const Inscribir = async (event) => {
     
    
        const rta=  await servicioFisca.enviarinscripcion(
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
                  <h2>INSCRIPCION A  FISCALIZACION  </h2>
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
               {/* 
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
                    label="Domicilio"
                    name="domicilio"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                />
                <br/>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                   ¿ Fuiste fiscal antes?
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    onChange={handleChange}
                    inputProps={{
                        name: 'movilidad',
                        id: 'uncontrolled-native',

                    }}
                >   <option value={'Sin determinar'}>Sin determinar</option>
                    <option value={'Si'}>Si</option>
                    <option value={'No'}>No</option>

                </NativeSelect>

                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                   ¿ Dispones de movilidad ?
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    onChange={handleChange}
                    inputProps={{
                        name: 'movilidad',
                        id: 'uncontrolled-native',

                    }}
                >   <option value={'Sin determinar'}>Sin determinar</option>
                    <option value={'Si'}>Si</option>
                    <option value={'No'}>No</option>

                </NativeSelect>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                   ¿ Sos Vegano?
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    onChange={handleChange}
                    inputProps={{
                        name: 'vegano',
                        id: 'uncontrolled-native',

                    }}
                >   <option value={'Sin determinar'}>Sin determinar</option>
                    <option value={'Si'}>Si</option>
                    <option value={'No'}>No</option>

                </NativeSelect>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                   ¿ Fuiste fiscal antes ?
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    onChange={handleChange}
                    inputProps={{
                        name: 'fiscal_antes',
                        id: 'uncontrolled-native',

                    }}
                >   <option value={'Sin determinar'}>Sin determinar</option>
                    <option value={'Si'}>Si</option>
                    <option value={'No'}>No</option>

                </NativeSelect>

                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Elegir escuela prioridad 1
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    onChange={handleChange}
                    inputProps={{
                        name: 'id_escuela',
                        id: 'uncontrolled-native',

                    }}

                >
                    <option value={'1'}> Elegir</option>
                    {escuelas.map((row) => (

                        <option value={row.id}> {row.nombre}</option>

                    ))}
                </NativeSelect>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Elegir escuela prioridad 2
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    onChange={handleChange}
                    inputProps={{
                        name: 'id_escuela2',
                        id: 'uncontrolled-native',

                    }}

                >
                    <option value={'1'}> Elegir</option>
                    {escuelas.map((row) => (

                        <option value={row.id}> {row.nombre}</option>

                    ))}
                </NativeSelect> */}
                        <br/>
                <CardActions>
                {fecha.nombre && fecha.apellido && fecha.dni && fecha.telefono ? <>     <Button variant="outlined"
                          onClick={() => Inscribir()}
                      >  Enviar inscripcion</Button> </>: <>     <Button variant="outlined" disabled
                      onClick={() => Inscribir()}
                  >  Enviar inscripcion</Button> </>}
                       </CardActions>
                
          
            </Paper>



        </>


    )
}

export default Estracto;