import axios from "axios"


//const baseUrl = 'https://back-loging-production.up.railway.app/cursos/'
const  baseUrl ='http://localhost:4000/cursos/'



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


 const datosusuario = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosusuario/'+ usuario, config)
return data
       
  }

  
  const detalledelcurso = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'detalledelcurso/'+ usuario, config)
return data
       
  }
const lista = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'lista/', config)
return data
       
  }

  

  const crear= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'crear',datos,config)
     
     alert(data)  
 }  
export default {datosusuario,lista,crear,detalledelcurso}
