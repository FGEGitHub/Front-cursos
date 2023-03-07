import axios from "axios"


//const baseUrl = 'https://back-loging-production.up.railway.app/cursos/'
const  baseUrl ='http://localhost:4000/encargados/'



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
    

return data
       
  }

  const curso = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'curso/'+usuario, config)
    

return data
       
  }



  const confirmarllamado= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'confirmaciondellamado',datos,config)
     
     alert(data)  
  } 
  
  
  export default {clases,curso,confirmarllamado}
