
import Navbar from "../components/Navbar";
//////////esme
import Login from '../pages/Login';



////Usuario 1
import Menu1 from '../pages/usuario1/Menu';


const Rutas = [
	 <Navbar/> ,

	

	
	/*{	path: '/',	element: <NotFound />
		}, */
		{ path: '/login', element: <Login /> },

		{ path: '/usuario/menu', element: <Menu1 /> },
		
		

];

export default Rutas;