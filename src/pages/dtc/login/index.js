





import { useNavigate, useParams } from "react-router-dom";
import Login from '../../../components/dtc/login/componente1'
import React, { useEffect, useState } from "react";
import Backg from '../../../Assets/fondodtc.jpg'


export default function Paginas() {
    const navigate = useNavigate();
    const [loginVisible, setLoginvisible] = useState(false)

    useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        console.log(loggedUserJSON) 
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          switch (user.nivel) {
            case 1:
              alert('usuario no autorizado')
              window.localStorage.removeItem('loggedNoteAppUser')
           //   navigate('/')
              break;
            case 2:
              navigate('/administracion/inscripciones')
              break;
          
            case 3:
              navigate('encargados/cursos')
            //  navigate('/coordinadores/novedades')
              break;

              case 4:
                navigate('encargados/cursos')
              //  navigate('/encargados/cursos')
                break;
           
            default:
                
              window.localStorage.removeItem('loggedNoteAppUser')
              navigate('/dtc/login')
              
              break;
          }
        }
        setLoginvisible(true)
      }, [])
      const estiloComponente = {
        background: Backg,
       
       // backgroundSize: 'cover', // Ajusta el tamaño de la imagen al contenedor
    //    backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
        height: '100%', // Ajusta la altura según tus necesidades
        // Puedes agregar más estilos según lo que necesites
      };
    return (
        <>
        <div style={{background:Backg}}>

      
        {loginVisible ? <>
       
        <Login/>
        </>:<></>}
        </div>
        </>
   
    );

}