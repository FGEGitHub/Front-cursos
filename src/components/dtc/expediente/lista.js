import servicioDtc from '../../../services/dtc'
import ModaNueva from './nuevo'
import Modificar from './modificar'
import React, { useEffect, useState, Fragment } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import {

    makeStyles,
    useMediaQuery,
    useTheme,
    Button
} from '@material-ui/core';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';



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
const transparentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Ajusta el valor alfa según sea necesario
  };

  const useStyles = makeStyles({
    table: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    bodyCell: {
      color: 'blue',
    },
    selectCell: {
      headerCell: {
        backgroundColor: '#880e4f',
      },
      checkboxRoot: {
        color: 'green',
      },
    },
  });



const TablaNotificaciones = (props) => {
    const theme = useTheme();
    const [chicos, setchicos] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const [datos, setDatos] = useState()
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles();

    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])

    
    const options = {
        setTableProps: () => {
            return {
              style: {
                backgroundColor: "#e3f2fd", // Cambia el color de fondo de la tabla
              },
            };
          },
          customHeadRender: (columnMeta, handleToggleColumn) => ({
            TableCell: {
              style: {
                backgroundColor: '#1565c0', // Cambia el color de fondo del encabezado
                color: 'white', // Cambia el color del texto del encabezado
              },
            },
          }),
        selectableRows: false, // Desactivar la selección de filas
        stickyHeader: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: true,
        responsive: 'scroll',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
        print: true,
        filter: true,
        viewColumns: true,
        pagination: true,

        textLabels: {
          body: {
            noMatch: "No se encontraron registros",
            toolTip: "Ordenar",
          },
          pagination: {
            next: "Siguiente",
            previous: "Anterior",
            rowsPerPage: "Filas por página:",
            displayRows: "de",
          },
          toolbar: {
            search: "Buscar",
            downloadCsv: "Descargar CSV",
            print: "Imprimir",
            viewColumns: "Ver columnas",
            filterTable: "Filtrar tabla",
          },
          filter: {
            all: "Todos",
            title: "FILTROS",
            reset: "RESETEAR",
          },
          viewColumns: {
            title: "Mostrar columnas",
            titleAria: "Mostrar/ocultar columnas de la tabla",
          },
          selectedRows: {
            text: "fila(s) seleccionada(s)",
            delete: "Eliminar",
            deleteAria: "Eliminar filas seleccionadas",
          },
        },

      };
    
      const theme2 = createTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root: {
              color: '#1e88e5', // Cambia el color del texto en las celdas del cuerpo
            },
          },
          MUIDataTableSelectCell: {
            headerCell: {
              backgroundColor: '#3f51b5', // Cambia el color de fondo de las celdas de selección en el encabezado
            },
            checkboxRoot: {
              color: '#3f51b5', // Cambia el color del icono de la casilla de verificación de selección
            },
          },
        },
      });
    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)

                const novedades_aux = await servicioDtc.listaexpedientes()
                setchicos(novedades_aux[0])
                setDatos(novedades_aux[1])
            }

        } catch (error) {

        }

    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>

                <div onClick={() => navigate('/cadia/usuario/chico/' + chicos[dataIndex]['id'])} >

                        <Button  onClick={() => navigate('/cadia/usuario/chico/' + chicos[dataIndex]['id'])} variant="contained">
Ver                        </Button>
                        <Modificar
                        id={chicos[dataIndex]['id']}
                        inicio={chicos[dataIndex]['inicio']}
                        cierre={chicos[dataIndex]['cierre']}
                        detalle={chicos[dataIndex]['detalle']}
                        cargado={chicos[dataIndex]['cargado']}



                        />
                 



                </div>


            </>
        );
    }




    // definimos las columnas
    const columns = [

        {
            name: "id",
            label: "id",

        },
        {
            name: "titulo",
            label: "titulo",

        },
        {
          name: "inicio",
          label: "inicio",
      },
    
        {
            name: "cierre",
            label: "cierre",

        },
        {
            name: "fecha_ingreso",
            label: "fecha_ingreso",

        },

        {
            name: "Ver",
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
        {
          name: "fecha_fin",
          label: "fecha_fin",
      },



    ];

    const fechaKeys = ["nacimiento", "aniversario", "graduacion", "logro", "evento"];
    const iconKeys = {
        nacimiento: 'birthday',
        aniversario: 'anniversary',
        graduacion: 'graduation',
        logro: 'achievement',
        evento: 'event'
    };
    // renderiza la data table
    return (
        <div sx={{
            cursor: 'pointer',
            backgroundColor: '#E09FBB',
            
            color: '#bdbdbd',
        
          }}
  >
     { datos ? <>  <Alert variant="filled">
</Alert> </>:<></>}
    

            <h2>Lista de chicos</h2>
            {chicos ? <>
                <div>


                    <ModaNueva
                        id_turno={id}
                        traer={async () => {
                          try {
                              const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                              if (loggedUserJSON) {
                                  const usuario = JSON.parse(loggedUserJSON)
                  
                                  setUsuario(usuario)
                  
                                  const novedades_aux = await servicioDtc.listaexpedientes()
                                  setchicos(novedades_aux[0])
                                  setDatos(novedades_aux[1])
                              }
                  
                          } catch (error) {
                  
                          }
                  
                      }}
                    />
                    {chicos.length > 0 ? <>


                        {isMatch ?
                            <>

                                <TableContainer>
                                    {!chicos ? <Skeleton /> : <>
                                        <h1>Lista de usuarios </h1>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Dni</b></TableCell>
                                                   <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Ver</b></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {chicos.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.apellido} {row.nombre}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.dni} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">  <AccountBoxIcon onClick={() => navigate('/dtc/usuario1/usuario/' + row.id)} /> </StyledTableCell>




                                                    </StyledTableRow>
                                                ))}




                                            </TableBody>
                                        </Table>
                                    </>}

                                </TableContainer>
                            </> : <><>
                      
               
                                <MUIDataTable

                                    title={"Lista de chicos"}
                                    data={chicos}
                                    columns={columns}
                                    actions={[
                                        {
                                            icon: 'save',
                                            tooltip: 'Save User',
                                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                                        }
                                    ]}
                                    options={options}
                                    className={classes.table} // Aplica el estilo de la tabla
                                    classes={{
                                      bodyCell: classes.bodyCell, // Aplica el estilo del texto en las celdas del cuerpo
                                      selectCell: classes.selectCell, // Aplica el estilo de las celdas de selección
                                    }}

                                />

                            </></>}

                    </> : <> <h2>El curso aun no tiene chicos</h2></>}



                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones