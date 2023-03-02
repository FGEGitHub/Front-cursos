import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioAdministracion from '../../../services/administracion'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Nuevo from './AgregarUsuario';
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";



export default function Ingresos() {
    let params = useParams()


    const [usuarios, setUsuarios] = useState([]);





    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {
 console.log('Historial')
        const historial = await servicioAdministracion.todos()
       
  
        setUsuarios(historial)
        // 

    };
  


    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <EditIcon
                    onClick={() => onClick(data[dataIndex].id, dataIndex)}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                />

            </>
        );
    }
    function Nivel(dataIndex, rowIndex, data, onClick) {
        return (
            <>
            { usuarios[dataIndex].nivel === 1 ? <> Alumna  </>:<>  {usuarios[dataIndex].nivel === 2 ? <> Administracion</>:<> {usuarios[dataIndex].nivel === 3 ? <>Coordinador </>:<>  {usuarios[dataIndex].nivel === 4 ? <> Encargad</>:<></>}</> }  </>}     </>}

            </>
        );
    }


    
    const columns = [
   
        {
            name: "nombre",
            label: "nombre",
        },
        {
            name: "usuario",
            label: "usuario",

        },
        {
            name: "nivel",
            label: "nivel",

        },
        {
            name: "Actions",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    Nivel(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },


        {
            name: "Actions",
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



    return (
        <div>
             <Paper
        sx={{
          cursor: 'pointer',
          background: '#eeeeee',
          color: '#eeeeee',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
<Nuevo/>
 
                <MUIDataTable

                    title={"Lista de usuarios"}
                    data={usuarios}
                    columns={columns}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                    ]}



                /></Paper>
          
        </div>
    );
}
