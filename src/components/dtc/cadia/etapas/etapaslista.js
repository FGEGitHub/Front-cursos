import servicioDtc from '../../../../services/dtc'

import ModaNueva from './nueva'
import React, { useEffect, useState, Fragment } from "react";
import Actualizar from './modificarr';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
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
import Modalborrar from './borrar'


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
    const [vistaCelular, setVistaCelular] = useState(true);
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
        rowsPerPageOptions: [50, 100, 150],
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
    
      const toggleVista = () => {
        setVistaCelular(!vistaCelular);
    };

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)

                const novedades_aux = await servicioDtc.traeretapacocinacadia()
                setchicos(novedades_aux[0])
                setDatos(novedades_aux[1])
            }

        } catch (error) {

        }

    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
<Actualizar
id={chicos[dataIndex]['id']}
fecha={chicos[dataIndex]['fecha']}
estado={chicos[dataIndex]['estado']}
titulo={chicos[dataIndex]['titulo']}
descripcion={chicos[dataIndex]['descripcion']}

traer={async () => {
  try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)

          setUsuario(usuario)

          const novedades_aux = await servicioDtc.traeretapacocinacadia()
          setchicos(novedades_aux[0])
          setDatos(novedades_aux[1])
      }

  } catch (error) {

  }

} }

/>

                    < Tooltip title="Ver">
                    <Modalborrar id={chicos[dataIndex]['id']}
                      traer={async () => {
                        try {
                            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                            if (loggedUserJSON) {
                                const usuario = JSON.parse(loggedUserJSON)
                
                                setUsuario(usuario)
                
                                const novedades_aux = await servicioDtc.traeretapacocinacadia()
                                setchicos(novedades_aux[0])
                                setDatos(novedades_aux[1])
                            }
                
                        } catch (error) {
                
                        }
                
                    } }
                    />
                    </Tooltip>






            </>
        );
    }




    // definimos las columnas
    const columns = [
      {
        name: "proyecto",
        label: "proyecto",

    },
    {
      name: "etapa",
      label: "etapa",

  },
    {
        name: "fecha",
        label: "fecha",

    },
    {
      name: "estado",
      label: "estado",

  },

  {
    name: "cargado",
    label: "cargado",

},

        {
            name: "descripcion",
            label: "descripcion",

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
  


    ];

    // renderiza la data table
    return (
        <div sx={{
            cursor: 'pointer',
            backgroundImage: 'linear-gradient(90deg, #9775fa 0%, #69db7c 0%, #3bc9db 99%, #ec8c69 100%, #f783ac 100%, #ffa94d 100%, #ed6ea0 100%)',
            
            color: '#bdbdbd',
        
          }}
  >
   
    { datos ? <>  <Alert variant="filled" severity="success">
</Alert> </>:<></>}
<Button variant="contained" color="primary" onClick={toggleVista}>
                {vistaCelular ? "Cambiar a Vista de PC" : "Cambiar a Vista del Cel"}
            </Button>
            <h2>Lista de etapassss</h2>
            {chicos ? <>
                <div>


                    <ModaNueva
                        id_usuario={usuario.id}
                        traer={async () => {
                          try {
                              const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                              if (loggedUserJSON) {
                                  const usuario = JSON.parse(loggedUserJSON)
                  
                                  setUsuario(usuario)
                  
                                  const novedades_aux = await servicioDtc.traeretapacocinacadia()
                                  setchicos(novedades_aux[0])
                                  setDatos(novedades_aux[1])
                              }else {

                                const novedades_aux = await servicioDtc.traeretapacocinacadia()
                                setchicos(novedades_aux[0])
                                setDatos(novedades_aux[1])
                              }
                  
                  
                          } catch (error) {
                  
                          }
                  
                      }}
                    />
                    {chicos.length > 0 ? <>


                      {!vistaCelular ? (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Título</TableCell>
                                <TableCell>Etapa</TableCell>
                                <TableCell>estado(modificaciones soraya)</TableCell>
                                <TableCell>Proyectar(modificaciones pipo)</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Actualizar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                         {chicos.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.fecha}</TableCell>
                                    <TableCell>{row.titulo}</TableCell>
                                    <TableCell>{row.proyecto}{row.etapa}</TableCell>
                                    <TableCell
  sx={{
    color: row.fecha_fin ? "lightgreen" : "yellow",
  }}
>
  <b> {row.fecha_fin === null
    ? `Iniciado - Fecha: ${row.fecha}`
    : `Finalizado - Fecha: ${row.fecha} - ${row.fecha_fin}`}</b>  
</TableCell>
<TableCell
  sx={{
    backgroundColor:
      row.proyectar === "Sin cargar en proyectar"
        ? "red"
        : row.proyectar === "Cerrado cargado en el proyectar"
        ? "lightgreen"
        : "yellow",
    color: "white", // Para que el texto sea más legible en rojo
  }}
>
  {row.proyectar}
</TableCell>

                                    <TableCell>{row.descripcion}</TableCell>
                                    <TableCell>
                                    <Actualizar
id={row.id}
fecha={row.fecha}
estado={row.estado}
titulo={row.titulo}
descripcion={row.descripcion}

traer={async () => {
  try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)

          setUsuario(usuario)

          const novedades_aux = await servicioDtc.traeretapacocinacadia()
          setchicos(novedades_aux[0])
          setDatos(novedades_aux[1])
      }

  } catch (error) {

  }

} }

/>
                                    <Modalborrar
                                       id={row.id}
                                       titulo={row.id}
                                       fecha={row.id}
                                       descripcion={row.id}
                                       fecha_fin={row.id}
                                       proyectar={row.id}
                                       estado={row.estado}
                                       traer={async () => {
                                        try {
                                            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                            if (loggedUserJSON) {
                                                const usuario = JSON.parse(loggedUserJSON)
                                
                                                setUsuario(usuario)
                                
                                                const novedades_aux = await servicioDtc.traeretapacocinacadia()
                                                setchicos(novedades_aux[0])
                                                setDatos(novedades_aux[1])
                                            }
                                
                                        } catch (error) {
                                
                                        }
                                
                                    }}
                                 />


                                    </TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <MUIDataTable
                    title="Lista de Etapas"
                    data={chicos}
                    columns={columns}
                    options={options}
                />
            )}

                    </> : <> <h2>Aun no hay etapas</h2></>}



                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones