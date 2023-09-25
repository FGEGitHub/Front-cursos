import axios from "axios"
const url =require ('./url')


const baseUrl = url.database+'coordinadores/'

//const baseUrl = 'http://esme.cuquicalvano.com:4000/coordinadores/'
//const  baseUrl ='http://localhost:4000/coordinadores/'



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



const clases = async (usuario) => {

    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'clases/'+usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
    

return data
       
  }
  
  const listadeausentes = async (usuario) => {

    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listadeausentes/'+usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
    

return data
       
  }
  const curso = async (usuario) => {
 
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'curso/'+usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
    

return data
       
  }

  

  const confirmaciondellamado= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'confirmaciondellamado',datos,config)
     
     alert(data)  
  } 
  

  const justificar= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'justificar',datos,config)
     
    return data
  } 
  
  

  const contactos = async (id) => {
   console.log(id)
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'contactos/'+id, config)
      console.log(data)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
  return data
  
  }
  export default {clases,justificar,contactos,curso,confirmaciondellamado,listadeausentes}
