



import MenuUsuario3 from '../../../components/usuario4/Menuizq4'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Curso from '../../../components/usuario3/curso/listadelcurso'
 
export default function Paginas() {

    const [logueado, setLogueado] = useState(false) 
    const navigate = useNavigate();
    useEffect(() => {
      
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        
      if (loggedUserJSON) {
        
        const user = JSON.parse(loggedUserJSON)
        if ( user.nivel != 3    ){
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
    <MenuUsuario3>
  
  <Curso/>

 </MenuUsuario3> 

 </div>   :<div></div>  }


   </> );

}