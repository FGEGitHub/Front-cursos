import axios from "axios"
const url =require ('./url')


const baseUrl = url.database+'carnavales/'

//const baseUrl = 'http://esme.cuquicalvano.com:4000/cursos/'
//const  baseUrl ='http://localhost:4000/cursos/'



const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
/////loggedUserJSON Recupera lasesion el tokeny lo envia mediante la constante config. el back lo filtra 
 let config = ''

 if (loggedUserJSON) {

  try {
      const userContext = JSON.parse(loggedUserJSON)
      config = {
         headers:{
             Authorization:`Bearer ${userContext.token}`
         }
     }
  } catch (error) {
        window.localStorage.removeItem('loggedNoteAppUser')
   
  }
 

  
}else{
   config = {
      headers:{
          Authorization:`Bearer `
      }
  }
}



const traerinscripcionesenc = async () => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerinscripcionesenc/', config)
  

return data
}


/////////////ver ruta al back
 const traerinscripciones = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerinscripciones/', config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }

  const desinscribir= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'desinscribir',datos,config)
     
     if(data=== 'error login'){
       
      window.localStorage.removeItem('loggedNoteAppUser')
      window.location.reload();
    } 
    return data
 } 

 const asignarinscripciones = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'asignarinscripciones', formdata, config)
  return data

}

const preinscriptascall= async  (id) => {


  const {data } = await axios.get(baseUrl+'preinscriptascall/'+id,config)
    console.log(data)
  return data
 } 

 const nocontesta = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'nocontesta', formdata, config)
  return data

}



const rechazarinscrip= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'rechazarinscrip',datos,config)
  if(data=== 'error login'){
       
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }  
  return data
} 

const asignarcurso= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'asignarcurso',datos,config)
  if(data=== 'error login'){
       
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }  
  return data
} 
export default {traerinscripciones,asignarcurso,rechazarinscrip,preinscriptascall,nocontesta, desinscribir,asignarinscripciones,traerinscripcionesenc}
