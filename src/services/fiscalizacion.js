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
const listademesas = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'listademesas/', config)
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



const traerpaso2inscrip = async () => {
  // const data = await axios.post('http://localhost:4000/signupp', datos)
  const { data } = await axios.get(baseUrl + 'traerpaso2inscrip/' , config)
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
export default { listaExtractos,modificarescuela,traerpaso2inscrip, crearescuela, traerincripcionesdealiado, borrarinscripcion, traerescuelasymesas, borrarescuela, registronivel3, todos, listadeescuelas, traermesas, datosdemesas, crearmesa, enviarinscripcion, subirpruebaescuelas, cargarinscripcionesescuelas, listademesas, listaExtractosescuelas, VerExtractoescuelas, inscribir, todaslasasignaciones, traerescuelas, datosusuarioporid, todasincripciones, VerExtracto, cargarinscripciones, subirprueba }
