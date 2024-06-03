import WebService, { ReponseWerbService } from "../../../config/WebService"
import { Login } from "../auth"

export const login = async (form: Login): Promise<ReponseWerbService> => {
    try {
        const { data } = await WebService.post('auth/login', form)
        return data
    } catch (error: any) {
        return error.response.data
    }
}