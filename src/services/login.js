import axios from "axios"


const  baseUrl ='http://esme.cuquicalvano.com:3000/signin'
//const  baseUrl ='http://localhost:4000/signin'
const config = {
    headers: {
      'mode': 'cors',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };



const login= async  credentials => {
    const {data } = await axios.post(baseUrl,credentials,config)
    console.log(data)
    return data 
}   

const guardar= async  credentials => {
    const {data } = await axios.post(baseUrl,credentials,config)
    return data 
} 
export default {login, guardar}
