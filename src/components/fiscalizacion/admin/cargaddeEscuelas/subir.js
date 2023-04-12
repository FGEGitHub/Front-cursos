
import { Paper, Button } from '@mui/material';

import Box from '@mui/material/Box';
import {useCallback, useState} from 'react';
import axios from 'axios';
import BackupIcon from '@material-ui/icons/Backup';
import serficiofisca from '../../../../services/fiscalizacion'


const SubirLegajo = (props) => {
  
    const [fileUpload, setFileUpload] = useState(null);
    const [file, setFile] = useState();
    const onDrop = useCallback((files, acceptedFiles) => {
        const formData = new FormData();
        setFileUpload(acceptedFiles);
           serficiofisca.subirpruebaescuelas(acceptedFiles)
          
   
        });
    
 


      const selecthandler = e => {
        setFile(e.target.files[0])
        console.log(file)

    }
    const enviar = () => {
        if (!file) {
            alert('No seleccionaste el archivo')
            return

        }
        let formdata = new FormData()
        formdata.append('image', file)
        serficiofisca.subirpruebaescuelas(formdata)
  
    }


    return (
        <>
       
      
      

  

      <input onChange={selecthandler} type="file" />
      <Button onClick={enviar}>Enviar</Button>
      </>
    );
  };
      
    
  export default SubirLegajo;