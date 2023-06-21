import { useState, useEffect } from "react";
import servicioFisca from '../../../../services/fiscalizacion'

import MUIDataTable from "mui-datatables";
import CargaDeTabla from "../../../CargaDeTabla"
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';



//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Estracto = () => {
    //configuracion de Hooks
    const [dats, setDats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([''])
    const [fecha, setFecha] = useState([''])
    const [activo, setActivo] = useState(false);
    const navigate = useNavigate();

    const getTodos = async () => {

        const tod = await servicioFisca.listaExtractos()
        console.log(tod)
        setTodos(tod)
    }


    const getClients = async () => {
        setActivo(true)
        const datos = await servicioFisca.VerExtracto(fecha)
        setDats(datos)
        setLoading(false);
    }
    const cargar = async (id) => {
        console.log(fecha)
      const datos = await servicioFisca.cargarinscripciones(fecha)
      alert(datos)
      
    }
    const cargarpresentes = async (id) => {
        console.log(fecha)
      const datos = await servicioFisca.cargarpresentes(fecha)
      alert(datos.map((row) => (row.dni + ' '+row.misma ))
      
    )}
    const handleChange = (e) => {
console.log(fecha)

        // setPago({ ...pago, ['id']: props.id })
        setFecha({ ...fecha, [e.target.name]: e.target.value })


    }
    useEffect(() => {
        getTodos()
    }, [])

    ///
    //opcionde click en el nombre

    //







    // definimos las columnas
    const columns = [
        {
            name: "dni",
            label: "dni",

        },
  
        {
            name: "nombre",
            label: "Nombre",

        },
        {
            name: "fiscal_antes",
            label: "fiscal_antes",
        },


       


    ];

    const options = {

        /*    rowsPerPage: 10,
           download: false, // hide csv download option
           onTableInit: this.handleTableInit,
           onTableChange: this.handleTableChange, */
    };
    // renderiza la data table
    return (
        <>
            <TextField component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate


                id="outlined-select-currency"
                select
                label="Elegir Fecha"
                name="id"
                onChange={handleChange}
                helperText="Seleccionar fecha"
            >
                {
                    todos.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.fecha}
                        </MenuItem>
                    ))}
            </TextField>
            {fecha.id != undefined ? <>
                <Button onClick={getClients}>Ver </Button>
            </> : <></>}
            {activo ? <>

                {loading ? (<CargaDeTabla />)
                    : (
                        <div>
                            <p>Importante: Listado de excels cargados. Los mismoss se muestran a continuacion pero hasta no confirmar no son las inscripciones definitivas</p>
                            <br />

                            <Button
                                onClick={() => cargar(fecha.id)}
                            >   Cargar inscripciones</Button>
                              <Button
                                onClick={() => cargarpresentes(fecha.id)}
                            >   Cargar presentes</Button>
                            <MUIDataTable

                                title={"Tabla de estracto"}
                                data={dats}
                                columns={columns}
                                actions={[
                                    {
                                        icon: 'save',
                                        tooltip: 'Save User',
                                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                                    }
                                ]}
                                options={options}


                            />
                        </div>
                    )}
            </> : <></>}
        </>


    )
}

export default Estracto;