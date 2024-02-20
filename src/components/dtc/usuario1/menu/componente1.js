import React from 'react';
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import CardInformacionDia from './tarjetahoy';
import CardSeleccionFecha from './tarjetaselecionar';
import  Acordeon   from '../acordeon';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '600px',
      margin: '0 auto',
    },
  },
}));

const handleFechaSeleccionada = (fecha) => {
  console.log('Fecha seleccionada:', fecha);
};

const LoginForm = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fechaActual = new Date();

  return (<>
    <Container component="main" className={classes.container}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <CardInformacionDia fecha={fechaActual} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <CardSeleccionFecha onFechaSeleccionada={handleFechaSeleccionada} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
<Acordeon/>
    </>
  );
};

export default LoginForm;

