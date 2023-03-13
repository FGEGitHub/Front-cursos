



import MenuUsuario4 from '../../../components/usaurio2/Menuizq2'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Subir from '../../../components/usaurio2/cargadeinscripciones/subir'
import Lista from '../../../components/usaurio2/cargadeinscripciones/tabla'
 
export default function Paginas() {

    const [logueado, setLogueado] = useState(false) 
    const navigate = useNavigate();
    useEffect(() => {
      
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        
      if (loggedUserJSON) {
        
        const user = JSON.parse(loggedUserJSON)
        if (user.nivel != 2 && user.nivel != 3    ){
          window.localStorage.removeItem('loggedNoteAppUser')
     
    
        }else{
    
          setLogueado(true)
        }
      
        //servicioUsuario.setToken(user.token)  
       
        
      }else{
        navigate('/login')
       
      }
     
    }, []) 
    
    
    


    return (
 
<>
{ logueado ? <div> 
    <MenuUsuario4>
 
    <Subir/><br/>
    <Lista/>
 </MenuUsuario4> 

 </div>   :<div></div>  }


   </> );

}