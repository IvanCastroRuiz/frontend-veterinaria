import WebService, { ReponseWerbService } from "../../../config/WebService"
import { Mascota } from "./mascota"

// const navigate = useNavigate()
// const location = useLocation()

export const obtenerMascotasClienteAPI = async (cliente_id: number): Promise<ReponseWerbService> => {

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

        const { data } = await WebService(`clientes/${cliente_id}/mascotas?estado=${1}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}


export const guardarMascotaAPI = async (cliente_id: number, form: Mascota): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.post(`clientes/${cliente_id}/mascotas`, form, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

export const buscarMascotaAPI = async (cliente_id: number, mascota_id: number): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.get(`clientes/${cliente_id}/mascotas/${mascota_id}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

export const editarMascotaAPI = async (cliente_id: number, mascota_id: number, form: Mascota): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.patch(`clientes/${cliente_id}/mascotas/${mascota_id}`, form, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

export const eliminarMascotaAPI = async (cliente_id: number, estado: number): Promise<ReponseWerbService> => {

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