import axios from "axios"


const baseUrl = 'http://esme.cuquicalvano.com:3000/personas/'
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
return data
  }


  const traerencargados = async (usuario) => { 
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerencargados/', config)
return data
  }



const datosusuario = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosusuario/'+ usuario, config)
return data
       
  }


  //////desde el id usaurio coordinador
  const datosdepersona = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datospersona/'+ usuario, config)
return data
       
  }

  const lista = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'lista/', config)
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



 const crear= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'crear',datos,config)
   
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



export default {subirprueba,asignarllamadoatodas,asignarllamado,crear,asignarEncargado,traerencargados,datosdepersona,modificardatosadic,datosusuario,datosusuarioporid,inscribir,lista}
