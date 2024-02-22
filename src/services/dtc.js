import axios from "axios"
const url =require ('./url')


const baseUrl = url.database+'dtc/'
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
  const listachiques = async () => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listachiques/', config)
return data
       
  }
  

  const datosdechique = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosdechique/'+id, config)
return data
       
  }
  
  
  const listadelegajos = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listadelegajos/'+id, config)
return data
       
  }

  const subirlegajo= async  (datos) => {

    const {data } = await axios.post(baseUrl+'subirlegajo',datos,config)
     
    return data  
 } 
 
  const nuevochique= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'nuevochique',datos,config)
     
     return data   
 } 
 const borrarlegajo= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'borrarlegajo',datos,config)
   
   return data  
}
 
export default {listachiques,nuevochique,datosdechique,subirlegajo,listadelegajos,borrarlegajo}
