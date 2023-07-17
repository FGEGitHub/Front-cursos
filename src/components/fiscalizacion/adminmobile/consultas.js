import React, { useState } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import servicioFisca from '../../../services/fiscalizacion'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const SimplePage = () => {
  const [form, setForm] = useState({edicion:"junio"});
  const [resultados, setResultados] = useState('');

  const handleChange = (e) =>
  setForm({ ...form, [e.target.name]: e.target.value });


  const columns = [

    {
        name: "dni",
        label: "dni",
    },

    {
        name: "nombre",
        options: {
            customBodyRenderLite: (dataIndex, rowIndex) =>
                CutomButtonsRenderercargado(
                    dataIndex,
                    rowIndex,
                    // overbookingData,
                    // handleEditOpen
                )
        }

    },
    {
        name: "Asignado a escuela",
        options: {
            customBodyRenderLite: (dataIndex, rowIndex) =>
                fiscalizofuncion(
                    dataIndex,
                    rowIndex,
                    // overbookingData,
                    // handleEditOpen
                )
        }

    },
    {
        name: "Id de mesa",
        options: {
            customBodyRenderLite: (dataIndex, rowIndex) =>
                mesafuncion(
                    dataIndex,
                    rowIndex,
                    // overbookingData,
                    // handleEditOpen
                )
        }

    },




    
  


];
function CutomButtonsRenderercargado(dataIndex, rowIndex, data, onClick) {
    return (
        <>
            {resultados[dataIndex].apellido +' '+ resultados[dataIndex].nombre  }


        </>

    );
}





function fiscalizofuncion(dataIndex, rowIndex, data, onClick) {
    return (
        <>
            {resultados[dataIndex].dniasig  !=null ?  <>Si</>: <>No</> }


        </>

    );
}



function mesafuncion(dataIndex, rowIndex, data, onClick) {
    return (
        <>
            {resultados[dataIndex].mesa !=null ?  <>{resultados[dataIndex].mesa}</>: <>Sin definir</> }


        </>

    );
}

  const handleDeterminarpordni = async (event) => {
    event.preventDefault();
    try {

     const rta = await servicioFisca.buscarestadopordni(form)
     console.log(rta)
     setResultados(rta)
     
     } catch (error) {
       console.error(error);
       console.log('Error algo sucedio')
   
     
     }

  };
  
  const handleDeterminarpornombre = async (event) => {
    event.preventDefault();
    try {

      const rta = await servicioFisca.buscarestadopornombre(form)
      setResultados(rta)
     
     } catch (error) {
       console.error(error);
       console.log('Error algo sucedio')
   
     
     }

  };
  
  return (
    <Container maxWidth="sm">
              <FormControl component="fieldset">
        <FormLabel component="legend">Edición</FormLabel>
        <RadioGroup name="edicion" value={form.edicion} onChange={handleChange}>
          <FormControlLabel value="junio" control={<Radio />} label="junio" />
          <FormControlLabel value="agosto" control={<Radio />} label="agosto" />
 
        </RadioGroup>
      </FormControl>
      <Grid container spacing={2} alignItems="center" justifyContent="center" marginTop={2}>
        <Grid item xs={12}>
          <TextField
            label="Buscar por dni"
            variant="outlined"
            fullWidth
            name="dni"
         
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
        {form.dni ? <> <Button variant="contained" color="primary" fullWidth onClick={handleDeterminarpordni}>
            Buscar por DNI
          </Button></> : <><Button variant="contained" color="primary" fullWidth disabled>
            Buscar porDNI
          </Button></> }
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Buscar por Nombre o Apellido"
            variant="outlined"
            fullWidth
            name="nombre"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {form.nombre ? <> <Button variant="contained" color="primary" fullWidth onClick={handleDeterminarpornombre}>
            Buscar por nombre o apellido
          </Button></> : <><Button variant="contained" color="primary" fullWidth disabled>
            Buscar por nombre o apellido
          </Button></> }
        
        </Grid>
      </Grid>
{resultados &&
<div className="mobile-table-container">
      <MUIDataTable
        title="Resultados"
        data={resultados}
        columns={columns}
        options={{
          responsive: 'simple',
          selectableRows: 'none',
          search: false,
          print: false,
          download: false,
          filter: false,
          viewColumns: false,
          pagination: false,
        }}
      />
      </div>
      }
    </Container>
  );
};

export default SimplePage;
