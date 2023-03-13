
import { Paper, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone'
import Box from '@mui/material/Box';
import {useCallback, useState} from 'react';
import axios from 'axios';
import BackupIcon from '@material-ui/icons/Backup';
import servicioPersonas from '../../../services/personas'


const SubirLegajo = (props) => {
  
    const [fileUpload, setFileUpload] = useState(null);
    const [file, setFile] = useState();
    const onDrop = useCallback((files, acceptedFiles) => {
        const formData = new FormData();
        setFileUpload(acceptedFiles);
           servicioPersonas.subirprueba(acceptedFiles)
          
   
        });
    
    
    const { getRootProps, getInputProps, isDragActive, isDragAccept, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
    
      });
      const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));  
  


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
        servicioPersonas.subirprueba(formdata)
  
    }


    return (
        <>
       
      
      
  
        <Box sx={{ m: 1, 
      color: 'green',
      fontSize: '1rem',      }}
       >
        Archivos Aceptados <BackupIcon fontSize="small" />
        <ul>{acceptedFileItems}</ul>
      </Box>
      <input onChange={selecthandler} type="file" />
      <Button onClick={enviar}>Enviar</Button>
      </>
    );
  };
      
    
  export default SubirLegajo;