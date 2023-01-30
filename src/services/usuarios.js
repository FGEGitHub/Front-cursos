import axios from "axios"


//const baseUrl = 'https://api.santacatalinafideicomiso.com/'
const  baseUrl ='http://localhost:4000/'


let token = null

const setToken = newToken =>{
    
    token = `Bearer ${newToken}`
}

const usuarios = async () => {
   
   const config = {
        headers:{
            Authorization:token
        }
    }//ver 
    const request = await axios.get(baseUrl+'prueba', config)
    let dataa = request.data
   console.log('hola')

    return dataa
     
}


const registro = async (datos) => {
   console.log(datos)
 



   // const data = await axios.post('http://localhost:4000/signupp', datos)
     const {data} = await axios.post(baseUrl+'signup', datos)

        alert(data)
 

      
 }
 const traerusuario = async (cuil_cuit) => {
  
 
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'traerusuario/'+ cuil_cuit)
return data
       
  }

export default { usuarios, setToken,registro, traerusuario}
