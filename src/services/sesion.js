

import servicioUsuario from "./usuarios"

const sesion = () => {
  const user = null
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
  
          servicioUsuario.setToken(user.token)  
          return (user)
        }
        return (user)
        
   
}
export default sesion;