



import MenuUsuario4 from '../../../components/usaurio2/Menuizq2'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cursos from '../../../components/usaurio2/Cursos/Listadecursos'
import Turnos from '../../../components/usaurio2/turnos/lista'
import Mantenimiento from '../../../Assets/mantenimiento2.jpeg';
 
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
    
    
    


    const islogo = {
      width: "60%",   
      margin: 0,
      padding: 0,
      display: "flex",
              
      };
   

    return (
 
<>
{ logueado ? <div> 
    <MenuUsuario4><Cursos/> 

   
  {/*       <img style={islogo} src={Mantenimiento} alt="logo" /> 
    <Turnos/> */}
 </MenuUsuario4> 

 </div>   :<div></div>  }


   </> );

}