
import Navbar from "../components/Navbar";
//////////esme
import Login from '../pages/Login';



////Usuario 1
import Menu1 from '../pages/usuario1/Menu';
import Perfil from '../pages/usuario1/Perfil';





////Usuario 2
import Menu2 from '../pages/usuario2/Cursos';
import Perfil2 from '../pages/usuario2/Perfil';

const Rutas = [
	 <Navbar/> ,

	

	
	/*{	path: '/',	element: <NotFound />
		}, */
		{ path: '/login', element: <Login /> },

		{ path: '/usuario/menu', element: <Menu1 /> },
		{ path: '/usuario/perfil', element: <Perfil /> },





		{ path: '/coordinadores/cursos', element: <Menu2 /> },
		{ path: '/coordinadores/perfil', element: <Perfil2 /> },
		
		

];

export default Rutas;