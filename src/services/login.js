import axios from "axios"


const  baseUrl ='http://esme.cuquicalvano.com:4000/signin2'
//const  baseUrl ='http://localhost:4000/signin'



const login= async  (credentials) => {
 
  const {data } = await axios.post(baseUrl,credentials)
    console.log(data)
    return data 
}   

const guardar= async  credentials => {
    const {data } = await axios.post(baseUrl,credentials)
    return data 
} 
export default {login, guardar}
