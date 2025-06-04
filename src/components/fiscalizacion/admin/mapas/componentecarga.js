import { useState, useEffect, useRef } from "react";
import DialogComponent from './modalbosqueslogin';

import NativeSelect from '@mui/material/NativeSelect';

import Barrios from './barrios';
import Circuitos from './circuitos';
import Escuelas from './escuelas';
import Recorridos from './recorridos';
//import Satelite from './satelite';
import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import servicioDatos from '../../../../services/fiscalizacion';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import './config.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Arg = () => {
  const dialogRef = useRef();
  const [info, setInfo] = useState();
  const [promedio, setPromedio] = useState(0);
  const [lotes, setLotes] = useState();
  const [seleccion, setSeleccion] = useState();
  const [imagenDeFondoActivada, setImagenDeFondoActivada] = useState(false);

  const [mostrarBarrios, setMostrarBarrios] = useState(true);
  const [mostrarCircuitos, setMostrarCircuitos] = useState(false);
  const [mostrarEscuelas, setMostrarEscuelas] = useState(false);
  const [mostrarRecorridos, setMostrarRecorridos] = useState(false);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleChange = (e) => {
    setSeleccion(e.target.value);
  };

  const toggleImagenDeFondo = () => {
    setImagenDeFondoActivada((prev) => !prev);
  };

  const getClients = async () => {
    const lotess = await servicioDatos.traerescuelas();
    setLotes(lotess);
    setPromedio(1 / 1);
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleOpenDialog = async (p) => {
    await setInfo(p);
    dialogRef.current.openDialog();
  };

  return (
    <>
      <div>
        <div style={{ marginBottom: '10px' }}>
          <Button onClick={zoomIn} variant="contained" color="secondary" style={{ marginRight: '5px' }}>
            Zoom +
          </Button>
          <Button onClick={zoomOut} variant="contained" color="secondary" style={{ marginRight: '5px' }}>
            Zoom -
          </Button>
          <Button onClick={resetZoom} variant="contained" color="secondary" style={{ marginRight: '5px' }}>
            Reset
          </Button>
          <Button
            onClick={toggleImagenDeFondo}
            variant="contained"
            color="primary"
            style={{ marginRight: '10px' }}
          >
            {imagenDeFondoActivada ? 'Desactivar' : 'Activar'} GPS
          </Button>

          <NativeSelect
            defaultValue=""
            onChange={handleChange}
            inputProps={{ name: 'anio', id: 'uncontrolled-native' }}
          >
            <option value="">Elegir</option>
            <option value="Verde">Verde</option>
            <option value="Amarillo">Amarillo</option>
            <option value="Rojo">Rojo</option>
          </NativeSelect>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <FormControlLabel
            control={<Checkbox checked={mostrarBarrios} onChange={() => setMostrarBarrios(v => !v)} />}
            label="Barrios"
          />
          <FormControlLabel
            control={<Checkbox checked={mostrarCircuitos} onChange={() => setMostrarCircuitos(v => !v)} />}
            label="Circuitos"
          />
          <FormControlLabel
            control={<Checkbox checked={mostrarEscuelas} onChange={() => setMostrarEscuelas(v => !v)} />}
            label="Escuelas"
          />
          <FormControlLabel
            control={<Checkbox checked={mostrarRecorridos} onChange={() => setMostrarRecorridos(v => !v)} />}
            label="Recorridos"
          />
        </div>

        <div
          className="zoom-pan-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="zoom-pan-content"
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            }}
          >
            {mostrarEscuelas && <Escuelas handleOpenDialog={handleOpenDialog} lotes={lotes} />}
        {mostrarBarrios && <Barrios handleOpenDialog={handleOpenDialog} lotes={lotes} />}
{mostrarCircuitos && <Circuitos handleOpenDialog={handleOpenDialog} lotes={lotes} />}

{mostrarRecorridos && <Recorridos handleOpenDialog={handleOpenDialog} lotes={lotes} />}
          </div>
        </div>
      </div>

      <DialogComponent
        ref={dialogRef}
        title=""
        info={info}
        mapa={'Bosques'}
        getClients={async () => {
          const lotess = await servicioDatos.traerloteslogin();
          setLotes(lotess[0]);
          setPromedio(lotess[1] / lotess[0].length);
        }}
      />
    </>
  );
};

export default Arg;
