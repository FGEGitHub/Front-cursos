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
  
  const traercostosfijos = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traercostosfijos/'+id, config)
return data
       
  }
  
  const traerstock = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerstock/'+id, config)
return data
       
  }
  const traerganancia = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerganancia/'+id, config)
return data
       
  }

  
  const traercaja = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traercaja/'+id, config)
return data
       
  }
  
  const getResumenNegocio = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'getResumenNegocio/'+id, config)
return data
       
  }
    
  const traercaja2 = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traercaja2/'+id, config)
return data
       
  }

  
  const traerinformes = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerinformes/'+id, config)
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
 


const enviarMovimiento= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'enviarmovimiento',datos,config)
  
  return data
} 

const modificarproductoesme= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'modificarproductoesme',datos,config)
  
  return data
} 

const modificarmovimiento= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'modificarmovimiento',datos,config)
  
  return data
} 
const borrarproducto= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'borrarproducto',datos,config)
  
  return data
} 

const borrarmovimiento= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'borrarmovimiento',datos,config)
  
  return data
} 

const agregarcostofijo= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'agregarcostofijo',datos,config)
  
  return data
} 

const modisficarcostosfijos= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'modisficarcostosfijos',datos,config)
  
  return data
}

const modificarganancia= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'modificarganancia',datos,config)
  
  return data
}



const enviarmovimientoingreso= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'enviarmovimientoingreso',datos,config)
  
  return data
}




const updateResumenNegocio= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'updateResumenNegocio',datos,config)
  
  return data
}


export default {updateResumenNegocio,enviarmovimientoingreso,getResumenNegocio,modificarmovimiento,traerinformes,traercaja2,traercaja,traerstock,borrarmovimiento,modificarganancia,traerganancia,traercostosfijos,modisficarcostosfijos,agregarcostofijo,borrarproducto,modificarproductoesme,enviarMovimiento,traermovimientos,traerproductos,crearnuevoproducto,listadeproductos,nuevoprpducto,borrararticulo,listadetodosproductos}
