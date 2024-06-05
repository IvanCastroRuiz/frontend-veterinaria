import WebService, { ReponseWerbService } from "../../../config/WebService"
import { Empleado } from "./empleados"

// const navigate = useNavigate()
// const location = useLocation()

export const obtenerEmpleadosAPI = async (): Promise<ReponseWerbService> => {

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

        const { data } = await WebService(`empleados?estado=${1}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}


export const guargarEmpleadoAPI = async (form: Empleado): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.post(`empleados`, form, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

export const buscarEmpleadoAPI = async (empleado_id: number): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.get(`empleados/${empleado_id}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

export const editarEmpleadoAPI = async (empleado_id: number, form: Empleado): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.patch(`empleados/${empleado_id}`, form, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}


export const eliminarEmpleadoAPI = async (empleado_id: number, estado: number): Promise<ReponseWerbService> => {

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

        const { data } = await WebService.delete(`empleados/${empleado_id}?estado=${estado}`, config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}