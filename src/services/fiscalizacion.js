import axios from "axios"
const url = require('./url')


const baseUrl = url.database + 'fiscalizacion/'
//const  baseUrl ='http://localhost:4000/signin2'




const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
/////loggedUserJSON Recupera lasesion el tokeny lo envia mediante la constante config. el back lo filtra 
let config = ''
if (loggedUserJSON) {
  const userContext = JSON.parse(loggedUserJSON)


  config = {
    headers: {

      Authorization: `Bearer ${userContext.token}`
    }
  }


} else {
  config = {
    headers: {
      Authorization: `Bearer `
    }
  }
}



const estadisticas1 = async () => {


  const { data } = await axios.get(baseUrl + 'estadisticas1', config)
  console.log(data)
  return data
}

const listaExtractos = async () => {


  const { data } = await axios.get(baseUrl + 'todaslasinscripciones', config)
  console.log(data)
  return data
}


const listaExtractosescuelas = async () => {


  const { data } = await axios.get(baseUrl + 'todaslasinscripcionesescuelas', config)
  console.log(data)
  return data
}


const todasincripciones2 = async (id) => {


  const { data } = await axios.get(baseUrl + 'todasincripciones2/'+id, config)
  console.log(data)
  return data
}

const todasincripciones = async () => {


  const { data } = await axios.get(baseUrl + 'todasincripciones', config)
  console.log(data)
  return data
}


const VerExtracto = async (id) => {
  ////
  console.log(id)
  const { data } = await axios.post(baseUrl + 'incripcionesid', id, config)
  console.log(data)
  return data
}

const VerExtractoescuelas = async (id) => {
  ////
  console.log(id)
  const { data } = await axios.post(baseUrl + 'incripcionesidescuelas', id, config)
  console.log(data)
  return data
}

const cargarinscripciones = async (id) => {
  ////
  console.log(id)
  const { data } = await axios.post(baseUrl + 'cargarinscripciones', id, config)
  console.log(data)
  return data
}

const cargarpresentes = async () => {
  ////

  const { data } = await axios.get(baseUrl + 'cargarpresentes',  config)
  console.log(data)
  return data
}
const cargarcantidades = async (id) => {
  ////
  console.log(id)
  const { data } = await axios.post(baseUrl + 'cargarcantidades', id, config)
  console.log(data)
  return data
}
const cargarinscripcionesescuelas = async (id) => {
  ////
  console.log(id)
  const { data } = await axios.post(baseUrl + 'cargarinscripcionesescuelas', id, config)
  console.log(data)
  return data
}
const subirprueba = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'subirprueba', formdata, config)
  console.log(data)

}
const subirpruebaescuelas = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'subirpruebaescuelas', formdata, config)
  console.log(data)

}


const datosusuarioporid = async (usuario) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'datosusuarioporid/' + usuario, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}



const traerescuelasymesas = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerescuelasymesas/' + id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const traerinscripcionesenc = async (usuario) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerinscripcionesenc/'+usuario, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}



const traerescuelasfalt = async (usuario) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerescuelasfalt/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}

const traerescuelas = async (usuario) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerescuelas/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const todaslasasignaciones = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'todaslasasignaciones/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const todaslasasignaciones2 = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'todaslasasignaciones2/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}


const todaslasasignaciones22 = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'todaslasasignaciones22/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}



const todaslasasignacionesdeunaescuela = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'todaslasasignacionesdeunaescuela/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}


const todaslasasignacionesdeun = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'todaslasasignacionesdeun/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const listademesas = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'listademesas/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}

const verlogueo = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)

  const { data } = await axios.get(baseUrl + 'verlogueo/', config)

  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}



const datosdemesas = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)

  const { data } = await axios.get(baseUrl + 'datosdemesas/', config)

  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}

const modificarmesa = async (datos) => {
  console.log(datos)
  const { data } = await axios.post(baseUrl + 'modificarmesa', datos, config)

  return data
}
const inscribir = async (datos) => {
  console.log(datos)
  const { data } = await axios.post(baseUrl + 'inscribir', datos, config)

  alert(data)
}
const crearmesa = async (datos) => {
  console.log(datos)
  const { data } = await axios.post(baseUrl + 'crearmesa', datos, config)

  alert(data)
}


const asignarmesaafiscal = async (datos) => {
  console.log(datos)
  const { data } = await axios.post(baseUrl + 'asignarmesaafiscal', datos, config)

  return data
}

const modificardatosdemesa = async (datos) => {
  console.log(datos)
  const { data } = await axios.post(baseUrl + 'modificardatosdemesa', datos, config)

  return data
}


const borrarescuela = async (datos) => {
  console.log(datos)
  const { data } = await axios.post(baseUrl + 'borrarescuela', datos, config)

  return data
}
const traermesas = async (datos) => {
  console.log(datos)
  const { data } = await axios.get(baseUrl + 'traermesas/' + datos, config)

  return data
}

const enviarinscripcion = async (datos) => {
  console.log(datos)
  const { data } = await axios.post(baseUrl + 'enviarinscripcion', datos, config)


  return (data)
}

const enviarinscripcionadmin = async (datos) => {
  console.log(datos)
  const { data } = await axios.post(baseUrl + 'enviarinscripcionadmin', datos, config)


  return (data)
}



const traerescparasig = async (usuario) => {
  ////////usaurios 
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerescparasig/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data

}

const todos = async (usuario) => {
  ////////usaurios 
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'todos/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data

}

const crearescuela = async (datos) => {
  console.log(datos)


  const { data } = await axios.post(baseUrl + 'crearescuela', datos, config)

  return data



}


const asignarcircuitos = async (datos) => {
  console.log(datos)


  const { data } = await axios.post(baseUrl + 'asignarcircuitos', datos, config)

  return data



}
const asignarinscripciones = async (datos) => {
  console.log(datos)


  const { data } = await axios.post(baseUrl + 'asignarinscripciones', datos, config)

  return data



}
const registronivel3 = async (datos) => {
  console.log(datos)


  const { data } = await axios.post(baseUrl + 'signupp', datos, config)

  alert(data)



}
const listadeescuelas = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'listadeescuelas/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}




const traerincripcionesdealiadoadmin = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)

  const { data } = await axios.get(baseUrl + 'traerincripcionesdealiadoadmin/' + id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}



const listadealiados = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)

  const { data } = await axios.get(baseUrl + 'listadealiados/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const traerincripcionesdealiado = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)

  const { data } = await axios.get(baseUrl + 'traerincripcionesdealiado/' + id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}


const borrarinscripcion = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'borrarinscripcion/' + id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}


const traerencargados = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerencargados/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const traerpaso2inscrip2 = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerpaso2inscrip2/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}

const todoslosencargados = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'todoslosencargados/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}

const traerinscripcionesdeunencargado = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerinscripcionesdeunencargado/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}


const desasignarencargado = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'desasignarencargado/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const traerpaso2inscrip = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerpaso2inscrip/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}



const traerdatosdepersona = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerdatosdepersona/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}


const estadisticasescuelas = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'estadisticasescuelas/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}

const traerdetallesdeunaescuelatraslado = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerdetallesdeunaescuelatraslado/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}

const traerdetallesdeunaescuela = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerdetallesdeunaescuela/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const traerpersonasdeunenc = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerpersonasdeunenc/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}




const rechazarcapacitacionmesa = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  console.log(id)
  const { data } = await axios.get(baseUrl + 'rechazarcapacitacionmesa/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  console.log(data)
  return data
}
const rechazarcapacitacion = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  console.log(id)
  const { data } = await axios.get(baseUrl + 'rechazarcapacitacion/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  console.log(data)
  return data
}

const Confirmarcapasupl = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  console.log(id)
  const { data } = await axios.get(baseUrl + 'Confirmarcapasupl/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const Confirmarcapa = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  console.log(id)
  const { data } = await axios.get(baseUrl + 'confirmarcapa/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}




const checksuplente = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'checksuplente/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const contactada = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'contactada/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const contactada2 = async (id) => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'contactada2/'+id, config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}
const traerpersonas = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerpersonas/', config)
  if (data === 'error login') {

    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
  return data
}

const modificarescuela = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'modificarescuela', formdata, config)
  return data

}


const modificarescuelaubicacion = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'modificarescuelaubicacion', formdata, config)
  return data

}
const borrarmesa = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'borrarmesa', formdata, config)
  return data

}




const verfaltantesescuelassuplentes = async (formdata) => {
 
  const { data } = await axios.get(baseUrl + 'verfaltantesescuelassuplentes', formdata, config)
  console.log(data)
  return data

}
const verfaltantesescuelas = async (formdata) => {
 
  const { data } = await axios.get(baseUrl + 'verfaltantesescuelas', formdata, config)
  console.log(data)
  return data

}
const traerestadisticasdeescuelas = async (formdata) => {
 
  const { data } = await axios.post(baseUrl + 'traerestadisticasdeescuelas', formdata, config)
  return data

}
const volverapaso1 = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'volverapaso1', formdata, config)
  return data

}
const volverapaso3 = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'volverapaso3', formdata, config)
  return data

}
const modificarobservaciones = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'modificarobservaciones', formdata, config)
  return data

}

const asignarencargado = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'asignarencargado', formdata, config)
  return data

}


const modificarpersonafisca = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'modificarpersonafisca', formdata, config)
  return data

}
const rechazarincrip = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'rechazarincrip', formdata, config)
  return data

}
const asignarencardadodeesc = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'asignarencardadodeesc', formdata, config)
  return data

}
const marcarnocontestado = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'marcarnocontestado', formdata, config)
  return data

}
const modificarestadodeinscrip = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'modificarestadodeinscrip', formdata, config)
  return data

}

const buscarestadopordni = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'buscarestadopordni', formdata, config)
  return data

}

const enviarobservacionnueva = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'enviarobservacionnueva', formdata, config)
  return data

}
const modificardondevota = async (formdata) => {
 
  const { data } = await axios.post(baseUrl + 'modificardondevota', formdata, config)
  return data

}

const buscarestadopornombre = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'buscarestadopornombre', formdata, config)
  return data

}


const listademesassuplentes = async  () => {


  const {data } = await axios.get(baseUrl+'listademesassuplentes',config)
    console.log(data)
  return data
 } 
 
 const todoslossuplentes = async  () => {


  const {data } = await axios.get(baseUrl+'todoslossuplentes',config)
    console.log(data)
  return data
 } 
 
 

 
 const traerobservaciones = async  (dni) => {
  const {data } = await axios.get(baseUrl+'traerobservaciones/'+dni,config)
    console.log(data)
  return data
 } 

 const traerasistenciasporescuela = async  () => {


  const {data } = await axios.get(baseUrl+'traerasistenciasporescuela',config)
    console.log(data)
  return data
 } 
 const veramigos = async  () => {


  const {data } = await axios.get(baseUrl+'veramigos',config)
    console.log(data)
  return data
 } 



 

 const todaspaso42 = async  (id) => {


  const {data } = await axios.get(baseUrl+'todaspaso42/'+id,config)
    console.log(data)
  return data
 } 
 
 const todaspaso4 = async  () => {


  const {data } = await axios.get(baseUrl+'todaspaso4',config)
    console.log(data)
  return data
 } 
 

 const listadecircuitos = async  () => {
  const {data } = await axios.get(baseUrl+'listadecircuitos',config)
    console.log(data)
  return data
 }
 
 

 const traercircuitos = async  () => {
  const {data } = await axios.get(baseUrl+'traercircuitos',config)
    console.log(data)
  return data
 }
 
 const traerescuelas2 = async  () => {
  const {data } = await axios.get(baseUrl+'traerescuelas2',config)
    console.log(data)
  return data
 }
 
 const traerescuelas3 = async  () => {
  const {data } = await axios.get(baseUrl+'traerescuelas3',config)
    console.log(data)
  return data
 }
 const verobservaciones = async  (id) => {
  const {data } = await axios.get(baseUrl+'verobservaciones/'+id,config)
    console.log(data)
  return data
 }

 
 const traerrecomendaciones = async  (id) => {
  const {data } = await axios.get(baseUrl+'traerrecomendaciones/',config)
    console.log(data)
  return data
 }
 
 const revisto = async  (id) => {
  const {data } = await axios.get(baseUrl+'revisto/'+id,config)
    console.log(data)
  return data
 }


export default {traercircuitos,contactada2,revisto,traerescuelas3,traerrecomendaciones,modificardondevota,enviarobservacionnueva,verobservaciones,todaspaso42,todaslasasignaciones22,todaslasasignaciones2,traerescuelas2,asignarcircuitos,marcarnocontestado,listadecircuitos,todaspaso4,buscarestadopornombre,buscarestadopordni,traerobservaciones,veramigos,cargarpresentes,traerasistenciasporescuela,verfaltantesescuelassuplentes,todoslossuplentes,verlogueo,modificarescuelaubicacion,rechazarcapacitacionmesa,Confirmarcapasupl,traerdetallesdeunaescuelatraslado,checksuplente,traerescuelasfalt,rechazarcapacitacion,verfaltantesescuelas,modificarestadodeinscrip,modificarobservaciones,Confirmarcapa,listademesassuplentes,contactada,estadisticasescuelas,rechazarincrip,todaslasasignacionesdeunaescuela,traerescparasig,asignarencardadodeesc,traerpersonasdeunenc,traerdetallesdeunaescuela,modificarpersonafisca,listadealiados,traerpersonas,traerdatosdepersona,todaslasasignacionesdeun, volverapaso3,borrarmesa,desasignarencargado,traerinscripcionesdeunencargado,asignarinscripciones,traerinscripcionesenc,modificardatosdemesa,todoslosencargados,traerpaso2inscrip2,todasincripciones2, traerencargados, asignarencargado, listaExtractos, asignarmesaafiscal, estadisticas1, cargarcantidades, volverapaso1, modificarmesa, enviarinscripcionadmin, traerincripcionesdealiadoadmin, modificarescuela, traerestadisticasdeescuelas, traerpaso2inscrip, crearescuela, traerincripcionesdealiado, borrarinscripcion, traerescuelasymesas, borrarescuela, registronivel3, todos, listadeescuelas, traermesas, datosdemesas, crearmesa, enviarinscripcion, subirpruebaescuelas, cargarinscripcionesescuelas, listademesas, listaExtractosescuelas, VerExtractoescuelas, inscribir, todaslasasignaciones, traerescuelas, datosusuarioporid, todasincripciones, VerExtracto, cargarinscripciones, subirprueba }
