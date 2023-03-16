import axios from "axios"


const baseUrl = 'http://esme.cuquicalvano.com:3000/'
//const  baseUrl ='http://localhost:4000/'

let token = null

const setToken = newToken =>{
    
    token = `Bearer ${newToken}`
}

const config = {
  headers:{
    'mode': 'cors',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization:token
  }
}


const usuarios = async () => {
   
  //ver 
    const request = await axios.get(baseUrl+'prueba', config)
    let dataa = request.data
   console.log('hola')

    return dataa
     
}


const registro = async (datos) => {
   console.log(datos)
 



   // const data = await axios.post('http://localhost:4000/signupp', datos)
     const {data} = await axios.post(baseUrl+'signup', datos,config)

        alert(data)
 

      
 }
 const datosusuario = async (cuil_cuit) => {
  
 
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosusuario/'+ cuil_cuit)
return data
       
  }

export default { usuarios, setToken,registro, datosusuario}
