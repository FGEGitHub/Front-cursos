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
 

const traerinscripcionesenc = async () => {
  
  // const data = await axios.post('http://localhost:4000/signupp', datos)
    const {data} = await axios.get(baseUrl+'traerinscripcionesenc/', config)
  

return data
}

const lista = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listacursos/', config)
    

return data
      

  }
  const crearcursos2daetapa = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'crearcursos2daetapa/', config)
    

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
     const incriptas2da= async  () => {


      const {data } = await axios.get(baseUrl+'incriptas2da',config)
        console.log(data)
      return data
     } 
     const preinscriptas= async  () => {


      const {data } = await axios.get(baseUrl+'preinscriptas',config)
        console.log(data)
      return data
     } 
     
     const preinscriptascall= async  (id) => {


      const {data } = await axios.get(baseUrl+'preinscriptascall/'+id,config)
        console.log(data)
      return data
     } 
     
     const buscarestadopordni = async (formdata) => {
      console.log(formdata)
      const { data } = await axios.post(baseUrl + 'buscarestadopordni', formdata, config)
      return data
    
    } 



    
    const modificarestadodeinscrip = async (formdata) => {
      console.log(formdata)
      const { data } = await axios.post(baseUrl + 'modificarestadodeinscrip', formdata, config)
      return data
    
    } 

    const buscarestadopornombre = async (formdata) => {
      console.log(formdata)
      const { data } = await axios.post(baseUrl + 'buscarestadopornombre', formdata, config)
      return data
    
    }
    const asignarencargado = async (formdata) => {
      console.log(formdata)
      const { data } = await axios.post(baseUrl + 'asignarencargado', formdata, config)
      return data
    
    }
    const asignarinscripciones = async (formdata) => {
      console.log(formdata)
      const { data } = await axios.post(baseUrl + 'asignarinscripciones', formdata, config)
      return data
    
    }
    
    const borrarinscripcionde = async (formdata) => {
      console.log(formdata)
      const { data } = await axios.post(baseUrl + 'borrarinscripcionde', formdata, config)
      return data
    
    }
    
export default {borrarinscripcionde,lista,asignarinscripciones,preinscriptascall,traerinscripcionesenc,crearcursos2daetapa,asignarencargado,modificarestadodeinscrip,incriptoss,preinscriptas,incriptas2da,buscarestadopornombre,buscarestadopordni,actualizarcursado,borrarturnos,cargarexcelpersonas,borrarincripciones,cargarinscripciones,VerExtracto, listaExtractos,confirmaciondellamado,designarturnos,desinscribirtodos,actualizarprioridades,listaaclaracioncriterios,inscribirauto,listacriterios}
