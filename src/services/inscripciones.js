import axios from "axios"
const url =require ('./url')


const baseUrl = url.database+'inscripciones/'


//const  baseUrl ='http://localhost:4000/inscripciones/'



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




 const listacriterios = async (usuario) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'listacriterios/', config)
  

return data
     
}
 

const lista = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listacursos/', config)
    

return data
      

  }
  const desinscribirtodos = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'desinscribirtodos/', config)
    

return data
      

  }
  const designarturnos = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'designarturnos/', config)
    

return data
      

  }


  
  const listaaclaracioncriterios = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listaaclaracioncriterios/', config)
    

return data
      

  }

  const inscribirauto = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'inscribirauto/', config)
    

return data
       
  }
  const actualizarprioridades= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'actualizarprioridades',datos,config)
     
     alert(data)  
 }  

 const confirmaciondellamado= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'confirmaciondellamado',datos,config)
   
   alert(data)  
} 

const listaExtractos= async  () => {


  const {data } = await axios.get(baseUrl+'todaslasinscripciones',config)
    console.log(data)
  return data
 } 
 
 
 
 const actualizarcursado= async  () => {


  const {data } = await axios.get(baseUrl+'actualizarcursado',config)
    alert(data)
  return data
 } 

 const borrarturnos= async  () => {


  const {data } = await axios.get(baseUrl+'borrarturnos',config)
    console.log(data)
  return data
 } 



 const VerExtracto= async  (id) => {
  ////
  console.log(id)
  const {data } = await axios.post(baseUrl+'incripcionesid',id,config)
    console.log(data)
   return data
   } 
   
   
   const cargarexcelpersonas= async  (id) => {
    ////
    console.log(id)
    const {data } = await axios.post(baseUrl+'cargarexcelpersonas',id,config)
      console.log(data)
     return data
     } 
   
   const cargarinscripciones= async  (id) => {
    ////
    console.log(id)
    const {data } = await axios.post(baseUrl+'cargarinscripciones',id,config)
      console.log(data)
     return data
     } 

     

     const borrarincripciones= async  () => {


      const {data } = await axios.get(baseUrl+'borrarincripciones',config)
        console.log(data)
      return data
     }  
     const incriptoss= async  () => {


      const {data } = await axios.get(baseUrl+'incriptoss',config)
        console.log(data)
      return data
     } 

     
export default {lista,incriptoss,actualizarcursado,borrarturnos,cargarexcelpersonas,borrarincripciones,cargarinscripciones,VerExtracto, listaExtractos,confirmaciondellamado,designarturnos,desinscribirtodos,actualizarprioridades,listaaclaracioncriterios,inscribirauto,listacriterios}
