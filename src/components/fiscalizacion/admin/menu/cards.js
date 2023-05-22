import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardUno from './cards/CardUno';
import CardDos from './cards/CardDos';
import CardTres from './cards/CardTres';
import CardCuatro from './cards/CardCuatro';
import CardCinco from './cards/cardCinco';
import CardSeis from './cards/CardSiete';
import CardOcho from './cards/CardOcho';
import CardSiete
from './cards/cardSeis';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Cards() {
  return (
  <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <CardTres />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <CardCuatro />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <CardDos />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <CardUno />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <CardCinco />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <CardSeis />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <CardSiete />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <CardOcho />
          </Item>
        </Grid>
      </Grid>
    </Box>
  </>
  );
}