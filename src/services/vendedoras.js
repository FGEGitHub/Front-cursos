import axios from "axios"
const url =require ('./url')


const baseUrl = url.database+'vendedoras/'
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





  //////desde el id usaurio coordinador
  const listadeproductos = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listadeproductos/'+ usuario, config)
return data
       
  }
  
  const listadetodosproductos = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listadetodosproductos/', config)
return data
       
  }

  

  const traerproductos = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerproductos/'+id, config)
return data
       
  }
  
  const traermovimientos = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traermovimientos/'+id, config)
return data
       
  }
  const nuevoprpducto= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'nuevoprpducto',datos,config)
     
     return data
 } 
 const borrararticulo= async  (datos) => {
 
   const {data } = await axios.post(baseUrl+'borrararticulo',datos,config)
   console.log(data)
   return data
} 
 

const crearnuevoproducto= async  (datos) => {
 
   const {data } = await axios.post(baseUrl+'crearnuevoproducto',datos,config)
   
   return data
} 
 
export default {traermovimientos,traerproductos,crearnuevoproducto,listadeproductos,nuevoprpducto,borrararticulo,listadetodosproductos}
