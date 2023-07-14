import React, { useState } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';
import MUIDataTable from 'mui-datatables';

const SimplePage = () => {
  const [searchText1, setSearchText1] = useState('');
  const [searchText2, setSearchText2] = useState('');

  const handleSearch1 = () => {
    // Lógica para buscar utilizando searchText1
    console.log('Buscar 1:', searchText1);
  };

  const handleSearch2 = () => {
    // Lógica para buscar utilizando searchText2
    console.log('Buscar 2:', searchText2);
  };

  const columns = ['Columna 1', 'Columna 2', 'Columna 3'];
  const data = [
    ['Dato 1', 'Dato 2', 'Dato 3'],
    ['Dato 4', 'Dato 5', 'Dato 6'],
    ['Dato 7', 'Dato 8', 'Dato 9'],
  ];

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignItems="center" justifyContent="center" marginTop={2}>
        <Grid item xs={12}>
          <TextField
            label="Buscar 1"
            variant="outlined"
            fullWidth
            value={searchText1}
            onChange={(e) => setSearchText1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSearch1}>
            Buscar 1
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Buscar 2"
            variant="outlined"
            fullWidth
            value={searchText2}
            onChange={(e) => setSearchText2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSearch2}>
            Buscar 2
          </Button>
        </Grid>
      </Grid>

      <MUIDataTable
        title="Datos"
        data={data}
        columns={columns}
        options={{
          responsive: 'vertical',
        }}
      />
    </Container>
  );
};

export default SimplePage;
