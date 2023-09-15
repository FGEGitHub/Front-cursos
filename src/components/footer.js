import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#f8f8f8', // Color de fondo del footer
    borderTop: '1px solid #ccc', // Línea superior
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="body1" color="textSecondary" align="right" style={{ width: '100%' }}>
        fernandog.enrique.dev@gmail.com
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
