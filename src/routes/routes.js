
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
import Curso2 from '../pages/usuario2/Curso';
import Estadoalumnas4 from '../pages/usuario2/cambiarestado';
import Avancedelcurso from '../pages/usuario2/avancedelcurso';
import Contacto from '../pages/usuario2/Contacto';
import Egresadas from '../pages/usuario2/egresadas';
import Preinscriptas from '../pages/usuario2/preinscriptas';
import Callcenter from '../pages/usuario2/callcenter';




/// 3


import Novedades3 from '../pages/usuario3/Novedades';
import Tareas3 from '../pages/usuario3/Tareas';
import Clases3 from '../pages/usuario3/cursos';
import Curso3 from '../pages/usuario3/curso';
import Turno3 from '../pages/usuario3/turno';
import Alumnosdelturno3 from '../pages/usuario3/alumnos';
import Estadoalumnas3 from '../pages/usuario3/cambiarestado';
import Contacto3 from '../pages/usuario3/contacto';
import Clase3 from '../pages/usuario3/clase';
///usuario4

import Clases4 from '../pages/usuario4/cursos';
import Curso4 from '../pages/usuario4/curso/index.js';
import Turno4 from '../pages/usuario4/Turno';
import Clase4 from '../pages/usuario4/clase';
import Alumnosdelturno from '../pages/usuario4/alumnos';
import Estadoalumnas from '../pages/usuario4/cambiarestado';


import Loginfis from '../pages/fiscalizacion/login';
import Menuadmin from '../pages/fiscalizacion/Admin/Menuprinc';
import CargarFisca from '../pages/fiscalizacion/Admin/cargarexcel';
import Fiscainscripc from '../pages/fiscalizacion/Admin/inscripciones';
import Mesasfisc from '../pages/fiscalizacion/Admin/mesas';
import Subiresc from '../pages/fiscalizacion/Admin/cargarescuelas.js'
import InscripcionFisca from '../pages/fiscalizacion/inscripciones'
import Usersfisca from '../pages/fiscalizacion/Admin/Usuarios'
import Aliadoscarga from '../pages/fiscalizacion/Aliados/aliadoscarga'
import EscuelasAdmin from '../pages/fiscalizacion/Admin/escuelas'
import Inscripciondearmin from '../pages/fiscalizacion/inscripcionadmin'
import Personas_fisca from '../pages/fiscalizacion/Admin/personas'
import EncargadosCarga from '../pages/fiscalizacion/Encargados/cargas'
import AdminEncargados from '../pages/fiscalizacion/Admin/encargados'
import AdminEncargado from '../pages/fiscalizacion/Admin/encargado'
import Personafisca from '../pages/fiscalizacion/Admin/persona'
import Aliadosfisca from '../pages/fiscalizacion/Admin/aliados'
import PersonasEncargados from '../pages/fiscalizacion/Encargados/personas'
import Personaenc from '../pages/fiscalizacion/Encargados//persona'
import UsuarioescTabla from '../pages/fiscalizacion/usuariosescuelas/asignados'
import Escuelapersona from '../pages/fiscalizacion/usuariosescuelas/persona'
import Suplentes from '../pages/fiscalizacion/Admin/suplentes'
import SuplentesPAgona from '../pages/fiscalizacion/suplentes/asignados'
import Movilidad from '../pages/fiscalizacion/usuariomovilidad/escuelas'
import Escru from '../pages/fiscalizacion/escrutinio/index'
import Consultas from '../pages/fiscalizacion/Adminmobile/menu'
import Circuitos from '../pages/fiscalizacion/Admin/circuitos'


import Inscripcionesesme from '../pages/inscripciones'
import Consultasinsc from '../pages/usuario2/consultasmobile'



import Llamadas from '../pages/usuario6/llamados';
const Rutas = [
	 <Navbar/> ,

	

	
	/*{	path: '/',	element: <NotFound />
		}, */
		{ path: '/', element: <Login /> },
		{ path: '/login', element: <Login /> },
	
		
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
		{ path: '/administracion/curso/:id', element: <Curso2 /> },
		{ path: '/administracion/estadoalumnas/:id', element: <Estadoalumnas4 /> },
		{ path: '/administracion/avancedelcurso/:id', element: <Avancedelcurso /> },
		{ path: '/administracion/contacto', element: <Contacto /> },
		{ path: '/administracion/egresadxs', element: <Egresadas /> },
		{ path: '/administracion/consultasmobile', element: <Consultasinsc /> },
		{ path: '/administracion/preinscriptas', element: <Preinscriptas /> },
		{ path: '/administracion/callcenter', element: <Callcenter /> },




		{ path: '/coordinadores/novedades', element: <Novedades3 /> },
		{ path: '/coordinadores/cursos', element: <Clases3 /> },
		{ path: '/coordinadores/tareas', element: <Tareas3 /> },
		{ path: '/coordinadores/curso/:id', element: <Curso3 /> },
		{ path: '/coordinadores/turno/:id', element: <Turno3 /> },
		{ path: '/coordinadores/alumnosdelturno/:id', element: <Alumnosdelturno3 /> },
		{ path: '/coordinadores/estadoalumnas/:id', element: <Estadoalumnas3 /> },
		{ path: '/coordinadores/contacto', element: <Contacto3 /> },
		{ path: '/coordinadores/clase/:id', element: <Clase3 /> },




		{ path: '/encargados/cursos', element: <Clases4 /> },
		{ path: '/encargados/curso/:id', element: <Curso4 /> },
		{ path: '/encargados/turno/:id', element: <Turno4 /> },
		{ path: '/encargados/alumnosdelturno/:id', element: <Alumnosdelturno /> },
		{ path: '/encargados/clase/:id', element: <Clase4 /> },
		{ path: '/encargados/estadoalumnas/:id', element: <Estadoalumnas /> },
		{ path: '/encargados/persona/:id', element: <DetallePersonas /> },
		{ path: '/inscripciones', element: <Inscripcionesesme /> },


		{ path: '/fiscalizacion/login', element: <Loginfis /> },
		{ path: '/fiscalizacion/administracion/menu', element: <Menuadmin /> },
		{ path: '/fiscalizacion/administracion/cargar', element: <CargarFisca /> },
		{ path: '/fiscalizacion/administracion/inscripciones', element: <Fiscainscripc /> },
		{ path: '/fiscalizacion/administracion/mesas', element: <Mesasfisc /> },
		{ path: '/fiscalizacion/administracion/subirescuelas', element: <Subiresc /> },
	{ path: '/fiscalizacion/inscripcion', element: <InscripcionFisca /> }, 
		{ path: '/fiscalizacion/usuarios', element: <Usersfisca /> },
		{ path: '/fiscalizacion/alia', element: <Aliadoscarga /> },
		{ path: '/fiscalizacion/administracion/escuelas', element: <EscuelasAdmin /> },
		{ path: '/fiscalizacion/inscripcionadmin', element: <Inscripciondearmin /> },
		{ path: '/fiscalizacion/administracion/personas', element: <Personas_fisca /> },
		{ path: '/fiscalizacion/encargados/carga', element: <EncargadosCarga /> },
		{ path: '/fiscalizacion/administracion/encargados', element: <AdminEncargados /> },
		{ path: '/fiscalizacion/administracion/encargado/:id', element: <AdminEncargado /> },
		{ path: '/fiscalizacion/persona/:id', element: <Personafisca /> },
		{ path: '/fiscalizacion/administracion/aliados', element: <Aliadosfisca /> },
		{ path: '/fiscalizacion/encargados/personas', element: <PersonasEncargados /> },
		{ path: '/fiscalizacion/encargados/persona/:id', element: <Personaenc/> },
		{ path: '/fiscalizacion/usuarioescuela/personas', element: <UsuarioescTabla/> },
		{ path: '/fiscalizacion/usuarioescuela/persona/:id', element: <Escuelapersona/> },
		{ path: '/fiscalizacion/administracion/suplentes', element: <Suplentes/> },
		{ path: '/fiscalizacion/suplentes/asignados', element: <SuplentesPAgona/> },
		{ path: '/fiscalizacion/consultas', element: <Consultas/> },
		{ path: '/fiscalizacion/movilidad/escuelas', element: <Movilidad/> },
		{ path: '/fiscalizacion/escrutinio', element: <Escru/> },
		{ path: '/fiscalizacion/administracion/circuitos', element: <Circuitos/> },



		{ path: '/llamados/todos', element: <Llamadas/> },
		

];

export default Rutas;