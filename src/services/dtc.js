import axios from "axios"
const url =require ('./url')


const baseUrl = url.database+'dtc/'
//const  baseUrl ='http://localhost:4000/tareas/'



const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
/////loggedUserJSON Recupera lasesion el tokeny lo envia mediante la constante config. el back lo filtra 
 let config = ''
 if (loggedUserJSON) {
     const userContext = JSON.parse(loggedUserJSON)
  
 
      config = {
         headers:{

             Authorization:`Bearer ${userContext.token}`
         }
     }
 
     
 }else{
      config = {
         headers:{
             Authorization:`Bearer `
         }
     }
 }




 
 const listaprofs = async () => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'listaprofs/', config)
return data
     
}
  //////desde el id usaurio coordinador
  const listachiques = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listachiques/', config)
return data
       
  }
  const listadepersonasgim = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listadepersonasgim/', config)
return data
       
  }
  
  const listachicoscadia = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listachicoscadia/', config)
return data
       
  }
    //////desde el id usaurio coordinador
    const listadepersonaspsiq = async () => {
  
      // const data = await axios.post('http://localhost:4000/signupp', datos)
        const {data} = await axios.get(baseUrl+'listadepersonaspsiq/', config)
  return data
         
    }
    
    const datosdepersonapsi = async (id) => {
  
      // const data = await axios.post('http://localhost:4000/signupp', datos)
        const {data} = await axios.get(baseUrl+'datosdepersonapsi/'+id, config)
  return data
         
    }
  const datosdechique = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosdechique/'+id, config)
return data
       
  }
  
  const datosdechiquecadia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosdechiquecadia/'+id, config)
return data
       
  }
  const listadelegajos = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listadelegajos/'+id, config)
return data
       
  }
  
  const listaexpedientes = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listaexpedientes/', config)
return data
       
  }

  const traerfoto = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerfoto/'+id, config)
return data
       
  }
  const traerasistencia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerasistencia/'+id, config)
return data
       
  }
  
  const clasesdetaller = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'clasesdetaller/'+id, config)
return data
       
  }


  const restar1 = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'restar1/'+id, config)
return data
       
  }

  const restar1p = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'restar1p/'+id, config)
return data
       
  }

  const sumar1 = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'sumar1/'+id, config)
return data
       
  }
  const sumar1p = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'sumar1p/'+id, config)
return data
       
  }
  const traertalleres = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traertalleres/', config)
return data
       
  }
  
  const traerprofesionales = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerprofesionales/', config)
return data
       
  }
  const traeretapacocina = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traeretapacocina/'+id, config)
return data
       
  }
  
  const traeretapacocinacadia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traeretapacocinacadia/', config)
return data
       
  }
  const traerclasestaller = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerclasestaller/'+id, config)
return data
       
  }
  
  const traerclasesprof = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerclasesprof/'+id, config)
return data
       
  }
  const traerintervenciones = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerintervenciones/', config)
return data
       
  }
  
  const traerpresentesdeclaseprof = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerpresentesdeclaseprof/'+id, config)
return data
       
  }


  const traerpresentesdeclase = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerpresentesdeclase/'+id, config)
return data
       
  }
  const traertodoslosturnosaprobac = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traertodoslosturnosaprobac/', config)
return data
       
  }
  
  const obtenerdetalle = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'obtenerdetalle/'+id, config)
return data
       
  }
  
  const traercitas = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traercitas/'+id, config)
return data
       
  }
  const traercitastodos = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traercitastodos/', config)
return data
       
  }

  const traerpresentes = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'traerpresentes/',{fecha:id.fecha,id:id.id}, config)
return data
       
  }
  
  const borrarturno = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'borrarturno/',id, config)
return data
       
  }
  const traerparaturnos = async (fecha) => {
  console.log(fecha)
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'traerparaturnos/',fecha, config)
return data
       
  }
  
  const ponerpresente = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'ponerpresente/',id, config)
return data
       
  }
  
    
  const ponerpresenteclaseprofs = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'ponerpresenteclaseprofs/',id, config)
return data
       
  }
  const ponerpresenteclase = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'ponerpresenteclase/',id, config)
return data
       
  }
  const sacarturno = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'sacarturno/',id, config)
return data
       
  }
  const agendarturno = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'agendarturno/',id, config)
return data
       
  }
  const subirlegajo= async  (datos) => {

    const {data } = await axios.post(baseUrl+'subirlegajo',datos,config)
     
    return data  
 } 
 const subirfotoperfil= async  (datos) => {

  const {data } = await axios.post(baseUrl+'subirfotoperfil',datos,config)
   
  return data  
} 
 
  const nuevochique= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'nuevochique',datos,config)
     
     return data   
 } 
 
 const nuevapersonagim= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'nuevapersonagim',datos,config)
   
   return data   
} 
 const nuevochiquecadia= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'nuevochiquecadia',datos,config)
   
   return data   
} 
 const nuevapersonapsiq= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'nuevapersonapsiq',datos,config)
   
   return data   
} 
 const traeractividades= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'traeractividades',datos,config)
   
   return data   
} 

 const modificarusuario= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarusuario',datos,config)
   
   return data   
}

const modificarusuariocadia= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarusuariocadia',datos,config)
   
   return data   
}
const modificarusuariopsiq= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarusuariopsiq',datos,config)
   
   return data   
}

const traeractividadeschico= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'traeractividadeschico',datos,config)
   
   return data   
}

 const borrarlegajo= async  (datos) => {
console.log(datos)
  const {data } = await axios.post(baseUrl+'borrarlegajo',datos,config)
   
   return data  
}
 

const nuevaactividad= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaactividad',datos,config)
   
   return data  
}

const traerestadisticas= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traerestadisticas',{fecha:datos},config)
   
   return data  
}
const borraractividad= async  (datos) => {
console.log(datos)
  const {data } = await axios.post(baseUrl+'borraractividad',datos,config)
   
   return data  
}

const borraractividadsocial= async  (datos) => {
  console.log(datos)
    const {data } = await axios.post(baseUrl+'borraractividadsocial',datos,config)
     
     return data  
  }
const borraractividadchico= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borraractividadchico',datos,config)
   
   return data  
}


const traertodaslasactividades= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traertodaslasactividades',datos,config)
   
   return data  
}

const nuevaactividadchico= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaactividadchico',datos,config)
   
   return data  
}

const nuevaintervencion= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaintervencion',datos,config)
   
   return data  
}
const traerasistenciasdetaller= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traerasistenciasdetaller',datos,config)
   
   return data  
}
const borrarusuariodtc= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borrarusuariodtc',datos,config)
   
   return data  
}

const borrarusuariocadia= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borrarusuariocadia',datos,config)
   
   return data  
}
const borrarusuariodtcpsiq= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borrarusuariodtcpsiq',datos,config)
   
   return data  
}
const traercumples= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traercumples',datos,config)
   
   return data  
}


const traerracionesmes= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traerracionesmes',datos,config)
   
   return data  
}

const determinarvinculo= async  (datos) => {

  const {data } = await axios.post(baseUrl+'determinarvinculo',datos,config)
   
   return data  
}

const determinaprofesional= async  (datos) => {

  const {data } = await axios.post(baseUrl+'determinaprofesional',datos,config)
   
   return data  
}
const establecerretiro= async  (datos) => {

  const {data } = await axios.post(baseUrl+'establecerretiro',datos,config)
   
   return data  
}

const establecerregreso= async  (datos) => {

  const {data } = await axios.post(baseUrl+'establecerregreso',datos,config)
   
   return data  
}

const agregarturno= async  (datos) => {

  const {data } = await axios.post(baseUrl+'agregarturno',datos,config)
   
   return data  
}

const traertodoslosturnosfecha= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traertodoslosturnosfecha',datos,config)
   
   return data  
}

const nuevaetapa= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaetapa',datos,config)
   
   return data  
}

const ponerausenteclase= async  (datos) => {

  const {data } = await axios.post(baseUrl+'ponerausenteclase',datos,config)
   
   return data  
}
const nuevaclasetaller= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaclasetaller',datos,config)
   
   return data  
}

const nuevaclaseprof= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaclaseprof',datos,config)
   
   return data  
}
const consultarasitencias= async  (datos) => {

  const {data } = await axios.post(baseUrl+'consultarasitencias',datos,config)
   
   return data  
}



const borrarclasee= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borrarclasee',datos,config)
   
   return data  
}

const borraretapa= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borraretapa',datos,config)
   
   return data  
}

const modificarclase= async  (datos) => {

  const {data } = await axios.post(baseUrl+'modificarclase',datos,config)
   
   return data  
}

const nuevaetapacadia= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaetapacadia',datos,config)
   
   return data  
}

const nuevoexpediente= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevoexpediente',datos,config)
   
   return data  
}

const agregarhorariochico= async  (datos) => {

  const {data } = await axios.post(baseUrl+'agregarhorariochico',datos,config)
   
   return data  
}

const modificarasist= async  (datos) => {

  const {data } = await axios.post(baseUrl+'modificarasist',datos,config)
   
   return data  
}

const agregarhorario= async  (datos) => {

  const {data } = await axios.post(baseUrl+'agregarhorario',datos,config)
   
   return data  
}

const traerhorariosprofesionales = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerhorariosprofesionales', config)
return data
     
}
const traerhorariosprofesional = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerhorariosprofesional/'+id, config)
return data
     
}


const traerhorarioschicos = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerhorarioschicos', config)
return data
     
}
const traerhorarioschico = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerhorarioschico/'+id, config)
return data
     
}
const verArchivo = async (id) => {
  const response = await axios.get(`${baseUrl}verarchivo/${id}`, {
    responseType: 'blob', // Asegúrate de obtener el archivo como un blob
  });
  return response;
};

const traerasitenciasociales = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerasitenciasociales/', config)
return data
     
}

const traercosassole = async (id) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traercosassole/', config)
return data
     
}
export default {modificarasist,traercosassole,borraractividadsocial,verArchivo,nuevaintervencion,traerasitenciasociales,determinaprofesional,listaprofs,traerhorarioschicos,traerhorariosprofesionales,agregarhorariochico,traerhorarioschico,agregarhorario,traerhorariosprofesional,ponerpresenteclaseprofs,traerpresentesdeclaseprof,nuevaclaseprof,traerclasesprof,traerprofesionales,traercitastodos,traercitas,nuevapersonagim,listadepersonasgim,nuevoexpediente,listaexpedientes,modificarusuariocadia,borrarusuariocadia,datosdechiquecadia,nuevochiquecadia,listachicoscadia,obtenerdetalle,traerintervenciones,traeretapacocinacadia,nuevaetapacadia,modificarclase,borraretapa,borrarclasee,consultarasitencias,ponerausenteclase,ponerpresenteclase,traerpresentesdeclase,nuevaclasetaller,traerclasestaller,nuevaetapa,traeretapacocina,traertodoslosturnosfecha,agregarturno,establecerregreso,establecerretiro,restar1p,sumar1p,determinarvinculo,traerracionesmes,restar1,sumar1,traertodoslosturnosaprobac,borrarturno,traerparaturnos,sacarturno,agendarturno,borrarusuariodtcpsiq,modificarusuariopsiq,listadepersonaspsiq,datosdepersonapsi,nuevapersonapsiq,borrarusuariodtc,traercumples,listachiques,traerestadisticas,traerasistencia,traerasistenciasdetaller,clasesdetaller,traertalleres,nuevochique,traerfoto,nuevaactividadchico,subirfotoperfil,borraractividadchico,traertodaslasactividades,traeractividadeschico,traeractividades,nuevaactividad,borraractividad,datosdechique,subirlegajo,listadelegajos,borrarlegajo,modificarusuario,traerpresentes,ponerpresente}
