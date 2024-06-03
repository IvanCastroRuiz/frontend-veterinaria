import axios from "axios"


export interface ReponseWerbService {
  error: boolean
  message: string
  data: any
}

const WebService = axios.create({
  // baseURL: `${import.meta.env.VITE_BACKEND_LOCAL}` 
  baseURL: `${import.meta.env.VITE_BACKEND_LOCAL}` 
})


export default WebService