import WebService, { ReponseWerbService } from "../../../config/WebService"
import { Producto } from "./citas"

// const navigate = useNavigate()
// const location = useLocation()

export const obtenerCitasAPI = async (): Promise<ReponseWerbService> => {

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

        const { data } = await WebService(`citas?estado=${1}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}


export const guardarProductoAPI = async (form: Producto): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.post(`productos`, form, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

export const buscarProductoAPI = async (producto_id: number): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.get(`productos/${producto_id}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

export const editarProductoAPI = async (producto_id: number, form: Producto): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.patch(`productos/${producto_id}`, form, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}


export const eliminarProductoAPI = async (empleado_id: number, estado: number): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.delete(`productos/${empleado_id}?estado=${estado}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}