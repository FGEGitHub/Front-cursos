import { useState, useEffect } from "react";
import servicioFisca from '../../../services/fiscalizacion'
import TextField from '@mui/material/TextField';

import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Lotes = () => {
    //configuracion de Hooks
    const [senador, setSenador] = useState(0);
    const [diputado, setDiputado] = useState(0);
    const [concejal, setConcejal] = useState(0);
    const [concejal2, setconcejal2] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



    useEffect(() => {

    }, [])

    ///
    //opcionde click en el nombre
    const handleChanged = (e) => {
        setDiputado( e.target.value )
     console.log(diputado)
     console.log(parseInt(diputado)+parseInt(senador)
     )

    }
    const handleChanges = (e) => {
        setSenador( e.target.value )
  

    }
    const handleChangec = (e) => {
        setConcejal( e.target.value )
       

    }
    const handleChangec2 = (e) => {
        setconcejal2( e.target.value )
     

    }

    // renderiza la data table
    return (
        <>


            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="senador"
                name="senador"
                onChange={handleChanges}
                fullWidth
                variant="outlined"
                size="small"
            />

            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Diiputado"
                name="diputado"
                onChange={handleChanged}
                fullWidth
                type="number"
                variant="outlined"
                size="small"
            />

            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="concejal"
                name="concejal"
                onChange={handleChangec}
                fullWidth
                type="number"
                variant="outlined"
                size="small"
            />

            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Numero de mesa"
                name="concejal2"
                onChange={handleChangec2}
                fullWidth
                type="number"
                variant="outlined"
                size="small"
            />

            {senador && diputado && concejal && concejal2 ?
                <>
                    {parseInt(concejal) + parseInt(concejal2) > parseInt(senador) ? <> <b> falta {parseInt(concejal) + parseInt(concejal2) - parseInt(senador)} senador </b>  {parseInt(concejal) + parseInt(concejal2) > parseInt(diputado) ? <>   <b> falta {parseInt(concejal) + parseInt(concejal2) - parseInt(diputado)} diputado  </b>   </> : <>
                    </>} </> : <>
                        {parseInt(concejal) + parseInt(concejal2) > parseInt(diputado) ? <> <b> falta {parseInt(concejal) + parseInt(concejal2) - parseInt(diputado)} diputado  </b> </> : <>
                        </>}
                    </>}
                </> : <></>}


        </>


    )
}

export default Lotes;