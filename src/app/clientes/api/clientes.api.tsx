import WebService, { ReponseWerbService } from "../../../config/WebService"
import { Cliente } from "./clientes"

// const navigate = useNavigate()
// const location = useLocation()

export const obtenerClientesAPI = async (): Promise<ReponseWerbService> => {

    const token = localStorage.getItem('token')
    if (!token) {
        // navigate('/')
        return { error: true, message: 'No tienes acceso a la aplicación', data: null }
    }

    // const estado = location.pathname.includes('inactivos') ? 2 : 1

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const { data } = await WebService(`clientes?estado=${1}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}


export const guardarClienteAPI = async (form: Cliente): Promise<ReponseWerbService> => {

    const token = localStorage.getItem('token')
    if (!token) {
        // navigate('/')
        return { error: true, message: 'No tienes acceso a la aplicación', data: null }
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const { data } = await WebService.post(`clientes`, form, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

export const buscarClienteAPI = async (cliente_id: number): Promise<ReponseWerbService> => {

    const token = localStorage.getItem('token')
    if (!token) {
        // navigate('/')
        return { error: true, message: 'No tienes acceso a la aplicación', data: null }
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const { data } = await WebService.get(`clientes/${cliente_id}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

export const editarClienteAPI = async (cliente_id: number, form: Cliente): Promise<ReponseWerbService> => {

    const token = localStorage.getItem('token')
    if (!token) {
        // navigate('/')
        return { error: true, message: 'No tienes acceso a la aplicación', data: null }
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const { data } = await WebService.patch(`clientes/${cliente_id}`, form, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}


export const eliminarClienteAPI = async (cliente_id: number, estado: number): Promise<ReponseWerbService> => {

    const token = localStorage.getItem('token')
    if (!token) {
        // navigate('/')
        return { error: true, message: 'No tienes acceso a la aplicación', data: null }
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const { data } = await WebService.delete(`clientes/${cliente_id}?estado=${estado}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}