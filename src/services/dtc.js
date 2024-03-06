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
  
  const traerpresentes = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'traerpresentes/',{fecha:id}, config)
return data
       
  }
  const ponerpresente = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.post(baseUrl+'ponerpresente/',id, config)
return data
       
  }
  
  const subirlegajo= async  (datos) => {

    const {data } = await axios.post(baseUrl+'subirlegajo',datos,config)
     
    return data  
 } 
 const subirfotoperfil= async  (datos) => {

  const {data } = await axios.post(baseUrl+'subirfotoperfil',datos,config)
   
  return data  
} 
 
  const nuevochique= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'nuevochique',datos,config)
     
     return data   
 } 
 

 const traeractividades= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'traeractividades',datos,config)
   
   return data   
} 

 const modificarusuario= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarusuario',datos,config)
   
   return data   
}
const traeractividadeschico= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'traeractividadeschico',datos,config)
   
   return data   
}

 const borrarlegajo= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borrarlegajo',datos,config)
   
   return data  
}
 

const nuevaactividad= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaactividad',datos,config)
   
   return data  
}

const borraractividad= async  (datos) => {
console.log(datos)
  const {data } = await axios.post(baseUrl+'borraractividad',datos,config)
   
   return data  
}
const borraractividadchico= async  (datos) => {

  const {data } = await axios.post(baseUrl+'borraractividadchico',datos,config)
   
   return data  
}


const traertodaslasactividades= async  (datos) => {

  const {data } = await axios.post(baseUrl+'traertodaslasactividades',datos,config)
   
   return data  
}

const nuevaactividadchico= async  (datos) => {

  const {data } = await axios.post(baseUrl+'nuevaactividadchico',datos,config)
   
   return data  
}
export default {listachiques,nuevochique,nuevaactividadchico,subirfotoperfil,borraractividadchico,traertodaslasactividades,traeractividadeschico,traeractividades,nuevaactividad,borraractividad,datosdechique,subirlegajo,listadelegajos,borrarlegajo,modificarusuario,traerpresentes,ponerpresente}
