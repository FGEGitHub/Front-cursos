



import MenuUsuario4 from '../../../components/usuario4/navbar'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Clases from '../../../components/usuario4/clases/todas'
 
export default function Paginas() {

    const [logueado, setLogueado] = useState(false) 
    const navigate = useNavigate();
    useEffect(() => {
      
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        
      if (loggedUserJSON) {
        
        const user = JSON.parse(loggedUserJSON)
        if ( user.nivel != 4    ){
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
  <MenuUsuario4/>
  <br/>  <br/>  <br/>  <br/>
  <Clases/>



 </div>   :<div></div>  }


   </> );

}