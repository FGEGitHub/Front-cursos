
import Navbar from "../components/Navbar";
//////////esme
import Login from '../pages/Login';
import Login2 from '../pages/login2';



////Usuario 1
import Menu1 from '../pages/usuario1/Cursos';
import Perfil from '../pages/usuario1/Perfil';
import Novedades1 from '../pages/usuario1/Novedades';





////Usuario 2 ADMINISTRACION
import Menu2 from '../pages/usuario2/Cursos';
import Perfil2 from '../pages/usuario2/Perfil';
import Detallecurso from '../pages/usuario2/Detallecurso';
import Asistencia from '../pages/usuario2/Asistencia';
import Personas from '../pages/usuario2/Personas';
import DetallePersonas from '../pages/usuario2/Detallepersona';
import Inscripciones from '../pages/usuario2/Inscripciones';
import InscripcionCurso from '../pages/usuario2/InscripcionCurso.js';
import Usuarios from '../pages/usuario2/usuarios';
import Cargadeinscrip from '../pages/usuario2/Cargadeinscrip';
import Turnoadmin from '../pages/usuario2/Turno';
import Claseadmin from '../pages/usuario2/Clase';
import TurnosAdmin from '../pages/usuario2/turnos';
import Sistemas from '../pages/usuario2/Sistema';
import Cursadocompleto from '../pages/usuario2/cursadocompl';
import Alumnosdelturno2 from '../pages/usuario2/AlumnosTurno';


/// 3


import Novedades3 from '../pages/usuario3/Novedades';
import Tareas3 from '../pages/usuario3/Tareas';
import Clases3 from '../pages/usuario3/cursos';
import Curso3 from '../pages/usuario3/curso';
import Turno3 from '../pages/usuario3/turno';
import Alumnosdelturno3 from '../pages/usuario3/alumnos';
///usuario4

import Clases4 from '../pages/usuario4/cursos';
import Curso4 from '../pages/usuario4/curso/index.js';
import Turno4 from '../pages/usuario4/Turno';
import Clase4 from '../pages/usuario4/clase';
import Alumnosdelturno from '../pages/usuario4/alumnos';





const Rutas = [
	 <Navbar/> ,

	

	
	/*{	path: '/',	element: <NotFound />
		}, */
		{ path: '/', element: <Login /> },
		{ path: '/login', element: <Login /> },
		{ path: '/loginadministracion', element: <Login2 /> },
		
		{ path: '/usuario/novedades', element: <Novedades1 /> },
		{ path: '/usuario/cursos', element: <Menu1 /> },
		{ path: '/usuario/perfil', element: <Perfil /> },

		



		{ path: '/administracion/cursos', element: <Menu2 /> },
		{ path: '/administracion/perfil', element: <Perfil2 /> },
		{ path: '/administracion/detallecurso/:id', element: <Detallecurso /> },
		{ path: '/administracion/asistencia/:id', element: <Asistencia /> },
		{ path: '/administracion/personas', element: <Personas /> },
		{ path: '/administracion/detallepersona/:id', element: <DetallePersonas /> },
		{ path: '/administracion/inscripciones', element: <Inscripciones /> },
		{ path: '/administracion/inscripciones/curso/:id', element: <InscripcionCurso /> },
		{ path: '/administracion/usuarios', element: <Usuarios /> },
		{ path: '/administracion/cargarinscripciones', element: <Cargadeinscrip /> },
		{ path: '/administracion/turno/:id', element: <Turnoadmin /> },
		{ path: '/administracion/clase/:id', element: <Claseadmin /> },
		{ path: '/administracion/turnos', element: <TurnosAdmin /> },
		{ path: '/administracion/sistemas', element: <Sistemas /> },
		{ path: '/administracion/cursadocompleto', element: <Cursadocompleto /> },
		{ path: '/administracion/alumnosdelturno/:id', element: <Alumnosdelturno2 /> },



		

		{ path: '/coordinadores/novedades', element: <Novedades3 /> },
		{ path: '/coordinadores/cursos', element: <Clases3 /> },
		{ path: '/coordinadores/tareas', element: <Tareas3 /> },
		{ path: '/coordinadores/curso/:id', element: <Curso3 /> },
		{ path: '/coordinadores/turno/:id', element: <Turno3 /> },
		{ path: '/coordinadores/alumnosdelturno/:id', element: <Alumnosdelturno3 /> },

		




		{ path: '/encargados/cursos', element: <Clases4 /> },
		{ path: '/encargados/curso/:id', element: <Curso4 /> },
		{ path: '/encargados/turno/:id', element: <Turno4 /> },
		{ path: '/encargados/alumnosdelturno/:id', element: <Alumnosdelturno /> },
		{ path: '/encargados/clase/:id', element: <Clase4 /> },
		
		
];

export default Rutas;