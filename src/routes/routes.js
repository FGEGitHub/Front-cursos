
import Navbar from "../components/Navbar";
//////////esme
import Login from '../pages/Login';



////Usuario 1
import Menu1 from '../pages/usuario1/Cursos';
import Perfil from '../pages/usuario1/Perfil';
import Novedades1 from '../pages/usuario1/Novedades';





////Usuario 2
import Menu2 from '../pages/usuario2/Cursos';
import Perfil2 from '../pages/usuario2/Perfil';
import Detallecurso from '../pages/usuario2/Detallecurso';
import Asistencia from '../pages/usuario2/Asistencia';
import Personas from '../pages/usuario2/Personas';
import DetallePersonas from '../pages/usuario2/Detallepersona';
import Inscripciones from '../pages/usuario2/Inscripciones';
import InscripcionCurso from '../pages/usuario2/InscripcionCurso.js';





///usuario 3


import Novedades3 from '../pages/usuario3/Novedades';
import Tareas3 from '../pages/usuario3/Tareas';


const Rutas = [
	 <Navbar/> ,

	

	
	/*{	path: '/',	element: <NotFound />
		}, */
		{ path: '/', element: <Login /> },
		{ path: '/login', element: <Login /> },
		{ path: '/usuario/novedades', element: <Novedades1 /> },
		{ path: '/usuario/cursos', element: <Menu1 /> },
		{ path: '/usuario/perfil', element: <Perfil /> },

		



		{ path: '/coordinadores/cursos', element: <Menu2 /> },
		{ path: '/coordinadores/perfil', element: <Perfil2 /> },
		{ path: '/coordinadores/detallecurso/:id', element: <Detallecurso /> },
		{ path: '/coordinadores/asistencia/:id', element: <Asistencia /> },
		{ path: '/coordinadores/personas', element: <Personas /> },
		{ path: '/coordinadores/detallepersona/:id', element: <DetallePersonas /> },
		{ path: '/coordinadores/inscripciones', element: <Inscripciones /> },
		{ path: '/coordinadores/inscripciones/curso/:id', element: <InscripcionCurso /> },




		{ path: '/profesores/novedades', element: <Novedades3 /> },
		
		{ path: '/profesores/tareas', element: <Tareas3 /> },

];

export default Rutas;