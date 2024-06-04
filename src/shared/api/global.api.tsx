import WebService, { ReponseWerbService } from "../../config/WebService"

export const obtenerTipoDocsAPI = async (): Promise<ReponseWerbService> => {
    const token = localStorage.getItem('token')
    if (!token) {

        return { error: true, message: 'No tienes acceso a la aplicación', data: null }
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }

    try {
        const { data } = await WebService('tipo-docs?estado=1', config)
        return data
    } catch (error: any) {
        return error.response.data
    }
}