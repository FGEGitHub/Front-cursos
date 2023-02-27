import axios from "axios"


//const baseUrl = 'https://back-loging-production.up.railway.app/inscripciones/'
const  baseUrl ='http://localhost:4000/inscripciones/'



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
export default {lista,desinscribirtodos,actualizarprioridades,listaaclaracioncriterios,inscribirauto,listacriterios}
