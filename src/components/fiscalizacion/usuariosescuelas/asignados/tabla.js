import * as React from 'react';
import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";
import servicioFidei from '../../../../services/fiscalizacion'
import { useNavigate } from "react-router-dom";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ConfirmarCapa from "./confirmarcapacitacion";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles'
import MobileScreenShareTwoToneIcon from '@mui/icons-material/MobileScreenShareTwoTone';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ResponsiveTable = styled(Table)(({ theme }) => ({
  overflowX: 'auto',
  '& .MuiTableCell-root': {
    whiteSpace: 'nowrap',
    padding: '8px 16px',
    textAlign: 'left',
  },
  '& .MuiTableBody-root .MuiTableCell-root': {
    borderBottom: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTableCell-root': {
      display: 'block',
      position: 'relative',
      paddingLeft: '40%',
      '&::before': {
        content: 'attr(data-label)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '40%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
      },
    },
    '& .MuiTableHead-root': {
      display: 'none',
    },
  },
}));



export default function Ingresos() {

  const navigate = useNavigate();

  const [inscrip, setInscrip] = useState([]);
  const [vista, setVista] = useState(true);
  const [personas, setpersonas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    traer()
  }, [])
  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON)

      const ins = await servicioFidei.todaslasasignacionesdeunaescuela(usuario.id)
      setInscrip(ins)
    }
   

    // 

  };
  const checkede = async (id) => {
    console.log(id)
     await servicioFidei.contactada(id)
    traer()
  };
  function CutomButtonsRenderer2(dataIndex, rowIndex, data, onClick) {
    return (
      <>

        <Button onClick={() => navigate('/fiscalizacion/usuarioescuela/persona/' + inscrip[dataIndex].idpersona)} >Ver persona</Button>

      </>

    );
  }
  function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
    return (
      <>

        <ConfirmarCapa
          id={inscrip[dataIndex].id}

          getClients={async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
              const usuario = JSON.parse(loggedUserJSON)
        
              const ins = await servicioFidei.todaslasasignacionesdeunaescuela(usuario.id)
              setInscrip(ins)
            }
        
        
            // 
        
          }} />


      </>

    );
  }

  const cambiarvista = () => {
    setVista(!vista);
  };

  const columns = [
    {
      name: "dni",
      label: "dni",
    },
    {
      name: "apellido",
      label: "apellido",

    },

    {
      name: "nombre",
      label: "nombre",
    },
    {
      name: "nombreescuela",
      label: "escuela",

    },
    {
      name: "numero",
      label: "numero mesa",

    },

    {
      name: "telefono",
      label: "telefono",

    },

    {
      name: "VER PERSONA",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          CutomButtonsRenderer2(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },

    {
      name: "Acciones/llamado",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          CutomButtonsRenderer(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },

  ];


  const CustomTable = ({ inscrip }) => {
    return (
      <Box sx={{ overflowX: 'auto' }}>
        <ResponsiveTable aria-label="customized table">
          <TableBody>
            {inscrip.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row" data-label="DNI">
                  {row.dni}
                </StyledTableCell>
                <StyledTableCell align="left" data-label="Apellido">
                  {row.apellido}
                </StyledTableCell>
                <StyledTableCell align="left" data-label="Nombre">
                  {row.nombre}
                </StyledTableCell>

                <StyledTableCell align="left" data-label="Nro de mesa">
                  {row.numero}
                </StyledTableCell>
                <StyledTableCell align="left" data-label="Ver persona">
                  <Button onClick={() => navigate('/fiscalizacion/usuarioescuela/persona/' + row.idpersona)}>
                    Ver persona
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left" data-label="Capacitacion">
                  <ConfirmarCapa
                    id={row.id}
                    getClients={async () => {
                      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                      if (loggedUserJSON) {
                        const usuario = JSON.parse(loggedUserJSON)
                  
                        const ins = await servicioFidei.todaslasasignacionesdeunaescuela(usuario.id)
                        setInscrip(ins)
                      }
                  
                  
                      // 
                  
                    }} 
                  />
                </StyledTableCell>
                <StyledTableCell align="left" data-label="Contactado">
                {row.dato1 == null  || row.dato1 == 'No'? <>  No contactado <Checkbox   onClick={() => checkede(row.id)}  {...label} /> </>:<> Contactado <Checkbox onClick={() => checkede(row.id)}  {...label} defaultChecked /></>}
            
               

                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </ResponsiveTable>
      </Box>
    );
  };

  return (
    <div>
      {inscrip[0] ? <>
        <h3>{inscrip[0]['nombreescuela']}</h3>
      </> : <></>}
      {vista ? <><Button variant='contained' onClick={cambiarvista} color='success'>Cambiar a Vista de pc <ComputerTwoToneIcon /></Button></> : <><Button variant='contained' onClick={cambiarvista} color='success'>Cambiar a vista de dispositivo movil <MobileScreenShareTwoToneIcon /></Button></>}

      {vista ? <>
        {inscrip.length > 0 ? <>
          <CustomTable inscrip={inscrip} />  </> : <><br /> <h3>No hay asignados</h3></>}
      </> : <>

        <Paper
          sx={{
            cursor: 'pointer',
            background: '#eeeeee',
            color: '#eeeeee',
            border: '1px dashed #ccc',
            '&:hover': { border: '1px solid #ccc' },
          }}
        >


          <MUIDataTable

            title={"Lista de Incripciones"}
            data={inscrip}
            columns={columns}
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              }
            ]}



          />



        </Paper>
      </>}

    </div>
  );
}