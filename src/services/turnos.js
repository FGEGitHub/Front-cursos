import axios from "axios"
const url =require ('./url')


const baseUrl = url.database+'turnos/'
//const  baseUrl ='http://localhost:4000/turnos/'



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



 
   //////
   const detalledelcurso = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'detalledelcurso/'+ usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }


  const lista2 = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'clasesdelturno2/'+ usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }

  //////desde el id usaurio coordinador
  const lista = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'clasesdelturno/'+ usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }


  const nuevaclase= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'nuevaclase',datos,config)
     
     alert(data)  
 } 
 

 const modificarTurno= async  (datos) => {
     const {data } = await axios.post(baseUrl+'modificarturno',datos,config)
     
     
 } 
 
 const desasignar= async  (datos) => {
  const {data } = await axios.post(baseUrl+'desasignar',datos,config)
  
  
} 
 const modificarclase= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarclase',datos,config)
   
   alert(data)  
} 


const borrarclase= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'borrarclase',datos,config)
   
   alert(data)  
} 
const modificarunaclase= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarunaclase',datos,config)
   
   return data
} 
const ponerausentes= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'ponerausentes',datos,config)
   
   return data
}

const traerclase = async (usuario) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerclase/'+ usuario, config)
    if(data=== 'error login'){
     
      window.localStorage.removeItem('loggedNoteAppUser')
      window.location.reload();
    }
return data
     
}


const traerturnosparainscri = async (usuario) => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerturnosparainscri/', config)
    if(data=== 'error login'){
     
      window.localStorage.removeItem('loggedNoteAppUser')
      window.location.reload();
    }
return data
     
}

export default {lista,traerturnosparainscri,desasignar,ponerausentes,modificarunaclase,traerclase,lista2,detalledelcurso,nuevaclase,modificarTurno,modificarclase,borrarclase}