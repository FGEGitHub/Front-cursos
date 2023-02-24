import axios from "axios"


//const baseUrl = 'https://back-loging-production.up.railway.app/'
const  baseUrl ='http://localhost:4000/personas/'



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





const datosusuario = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosusuario/'+ usuario, config)
return data
       
  }


  //////desde el id usaurio coordinador
  const lista = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datospersona/'+ usuario, config)
return data
       
  }


  const contestar= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'inscribir',datos,config)
     
     alert(data)  
 } 
 
export default {lista,inscribir}
