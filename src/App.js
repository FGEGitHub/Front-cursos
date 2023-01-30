import Rutas from './routes/routes'
import {BrowserRouter, useRoutes, Route, Switch} from 'react-router-dom'

import { useNavigate } from "react-router-dom";


function App () {

  const element = useRoutes(Rutas)

  const navigate = useNavigate();

  
///




///
  

    return(

      
 
 

  
   element

)

 

}


export default () =>
 <BrowserRouter>
  <App />

 </BrowserRouter>