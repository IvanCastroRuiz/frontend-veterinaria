import WebService, { ReponseWerbService } from "../../../config/WebService"

// const navigate = useNavigate()
// const location = useLocation()

const obtenerEmpleadosAPI = async (): Promise<ReponseWerbService> => {

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


export { obtenerEmpleadosAPI }