import { useState, useEffect } from "react";
import servicioFisca from '../../../../services/fiscalizacion'
import MUIDataTable from "mui-datatables";
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles'
import MobileScreenShareTwoToneIcon from '@mui/icons-material/MobileScreenShareTwoTone';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import Traslados from "./vertraslado"
import Ubicacion from "./modalubi"
import { Box } from '@mui/material';
import Info from "./modalverdetalles"
import Button from '@mui/material/Button';


//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  
const Lotes = () => {
    //configuracion de Hooks
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [vista, setVista] = useState(true);
    const navigate = useNavigate();

    const cambiarvista = () => {
      setVista(!vista);
    };
  


    const getClients = async () => {

        const clients = await servicioFisca.listadeescuelas({

        })
        console.log(clients)
        setClients(clients)
        setLoading(false);
    }

    useEffect(() => {
        getClients()
    }, [])

    ///
    //opcionde click en el nombre
    function CutomButtonsRenderer3(dataIndex, rowIndex, data, onClick) {
        return (
            <>


                <Info
                    id={clients[dataIndex].id}
                />



            </>
        );
    }
    //

    function CutomButtonsRenderer2(dataIndex, rowIndex, data, onClick) {
        return (
            <>


                {clients[dataIndex].cantidad_mesas - clients[dataIndex].cantidad_asig}

            </>
        );
    }

    function traslados(dataIndex, rowIndex, data, onClick) {
        return (
            <>

                <Traslados
                    id={clients[dataIndex].id}
                    nombre={clients[dataIndex].nombre}
                />


            </>
        );
    }
    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>

         
               
                <Ubicacion
                    id={clients[dataIndex].id}
                    nombre={clients[dataIndex].nombre}
                    circuito={clients[dataIndex].circuito}

                    getClients={async () => {

                        const clients = await servicioFisca.listadeescuelas({

                        })
                        console.log(clients)
                        setClients(clients)
                        setLoading(false);
                    }} />



            </>
        );
    }
    // definimos las columnas
    const columns = [
 
        {
            name: "nombre",
            label: "Escuela",

        },
        {
            name: "circuito",
            label: "Circuito",

        },
        {
            name: "dato1",
            label: "Encargado",

        },

        {
            name: "dato2",
            label: "telefono encargado",

        },
  
  
        {
            name: "cantidad_movil",
            label: "cantidad que necesitan movil",

        },
   
        {
            name: "Traslado",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    traslados(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
        {
            name: "Faltan",
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
            name: "Ver escuela",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderer3(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },

        {
            name: "Modificar/borrar",
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

    const options = {

        /*    rowsPerPage: 10,
           download: false, // hide csv download option
           onTableInit: this.handleTableInit,
           onTableChange: this.handleTableChange, */
    };
    // renderiza la data table
    const CustomTable = ({ inscrip }) => {
        return (
          <Box sx={{ overflowX: 'auto' }}>
            <ResponsiveTable aria-label="customized table">
              <TableBody>
                {inscrip.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row" data-label="Escuela">
                      {row.nombre}
                    </StyledTableCell>
                    <StyledTableCell align="left" data-label="Circuito">
                      {row.circuito}
                    </StyledTableCell>
                    <StyledTableCell align="left" data-label="Encargado">
                      {row.dato1}
                    </StyledTableCell>
                    <StyledTableCell align="left" data-label="telefono Encargado">
                      {row.dato2}
                    </StyledTableCell>
                    <StyledTableCell align="left" data-label="Cant. Necesitan movil">
                      {row.cantidad_movil}
                    </StyledTableCell>
                    <StyledTableCell align="left" data-label="Veganos">
                      {row.cantidad_veg}
                    </StyledTableCell>
                    <StyledTableCell align="left" data-label="Celiacos">
                      {row.cantidad_cel}
                    </StyledTableCell>
                    <StyledTableCell align="left" data-label="traslados">
                    <Traslados
                    id={row.id}
                    nombre={row.nombre}
                />
                      
                    </StyledTableCell>
                    <StyledTableCell align="left" data-label="Info escuela">
                    <Info
                    id={row.id}
                />

                    </StyledTableCell>
      
                    
                   
                  </StyledTableRow>
                ))}
              </TableBody>
            </ResponsiveTable>
          </Box>
        );
      };
    
    return (
        <>
        <Button variant='contained' onClick={cambiarvista} color='success'>Cambiar a Vista  </Button>
   {vista ? <>
            {loading ? ("<CargaDeTabla />")
                : (
                    <div>
                        <Stack spacing={2} sx={{ width: '100%' }}>

                            <Alert severity="info">Cantidad de Escuelas : {clients.length} (No estan contemplados los suplentes)</Alert>
                        </Stack>

                      
                        <br />
                                               <MUIDataTable

                            title={"Lista de Mesas"}
                            data={clients}
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
                </>:<> {clients.length > 0 ? <>
          <CustomTable inscrip={clients} />  </> : <><br /> <h3>No hay asignados</h3></>}</>}
        </>


    )
}

export default Lotes;