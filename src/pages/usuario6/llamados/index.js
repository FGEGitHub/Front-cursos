



import MenuUsuario4 from '../../../components/usuario6/menuusuario6'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alumnostabla from '../../../components/usuario4/alumnos/tabla'
 
export default function Paginas() {

    const [logueado, setLogueado] = useState(false) 
    const navigate = useNavigate();
    useEffect(() => {
      
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        
      if (loggedUserJSON) {
        
        const user = JSON.parse(loggedUserJSON)
        if (user.nivel != 6    ){
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
  


 </MenuUsuario4> 

 </div>   :<div></div>  }


   </> );

}