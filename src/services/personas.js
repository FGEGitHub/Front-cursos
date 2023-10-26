import axios from "axios"
const url =require ('./url')


const baseUrl = url.database+'personas/'
//const  baseUrl ='http://localhost:4000/personas/'



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




 
 const datosusuarioporid = async (usuario) => { 
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosusuarioporid/'+ usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
  }
  

  const traercoordiandores = async (usuario) => { 
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traercoordiandores/', config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
  }
  const traerencargados = async (usuario) => { 
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerencargados/', config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
  }



const datosusuario = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosusuario/'+ usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }


  //////desde el id usaurio coordinador
  const datosdepersona = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datospersona/'+ usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }

  const lista = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'lista/', config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }


  const traerusuario = async (cuil_cuit) => {
  
 
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerusuario/'+ cuil_cuit,config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }
  
  const traerobservaciones = async (cuil_cuit) => {
  
 
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerobservaciones/'+ cuil_cuit,config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }
  const traerpersona = async (cuil_cuit) => {
  
 
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerpersona/'+ cuil_cuit,config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }
  const inscribir= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'inscribir',datos,config)
     
     alert(data)  
 } 
 const asignarllamado= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'asignarllamado',datos,config)
   
   alert(data)  
} 
const asignarllamadoatodas= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'asignarllamadoatodas',datos,config)
   
   alert(data)  
} 

const asignarEncargado= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'asignarencargado',datos,config)
   
   alert(data)  
} 
const cambiarestadocursado= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'cambiarestadocursado',datos,config)
   
   alert(data)  
} 


const asignarcoordinador= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'asignarcoordinador',datos,config)
   
   alert(data)  
}


 const crear= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'crear',datos,config)
   
   alert(data)  
} 
 

const modificarpersona= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarpersona',datos,config)
   
   alert(data)  
} 
 
 const modificardatosadic= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificardatosadic',datos,config)
   
   alert(data)  
} 
 

const subirprueba = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'subirprueba', formdata,config)
  console.log(data)

}


const desinscribir = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'desinscribir', formdata,config)
  console.log(data)

}

const enviarinscripcion = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'enviarinscripcion', formdata,config)
  
  return data

}
const enviarinscripcioncarnaval = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'enviarinscripcioncarnaval', formdata,config)
  
  return data

}

const agregarobservacion = async (formdata) => {

  const { data } = await axios.post(baseUrl + 'agregarobservacion', formdata,config)
  console.log(data)
  return data

}


export default {subirprueba,enviarinscripcioncarnaval,traerobservaciones,desinscribir,enviarinscripcion,traerpersona,traerusuario,cambiarestadocursado,agregarobservacion,asignarcoordinador,traercoordiandores,modificarpersona,asignarllamadoatodas,asignarllamado,crear,asignarEncargado,traerencargados,datosdepersona,modificardatosadic,datosusuario,datosusuarioporid,inscribir,lista}
