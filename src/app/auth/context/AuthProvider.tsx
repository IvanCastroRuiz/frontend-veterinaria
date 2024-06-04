import { createContext, useState } from "react";
import { login } from "../api/auth.api";
import { Login } from "../auth";
import { ReponseWerbService } from "../../../config/WebService";
import { redirectUser } from "../../../shared/constants";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>({});

const AuthProvider = ({ children }: any) => {

  const navigate = useNavigate()

  const [sideOpen, setSideOpen] = useState(false);

  const [alerta, setAlerta] = useState<{ error: boolean, msg: string }>({
    error: false,
    msg: ''
  })

  const [formLogin, setFormLogin] = useState<Login>({
    correo: '',
    contrasena: '',
  })


  const loginUsuario = async (form: Login) => {
    const { error, message, data }: ReponseWerbService = await login(form)

    if (error) {
      setAlerta({ error: error, msg: message })
      setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
      return
    }

    const usuario = { ...data }
    delete usuario.access_token
    delete usuario.menus

    localStorage.setItem('token', data.access_token)
    localStorage.setItem('usuario', JSON.stringify(usuario))
    localStorage.setItem('menus', JSON.stringify(data.menus))

    navigate(redirectUser[data.perfiles[0].id_perfil]) 
  }

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('menus')
    navigate('/')
  }

  return <AuthContext.Provider value={{
    alerta, setAlerta,
    formLogin, setFormLogin,
    loginUsuario, sideOpen, setSideOpen,
    cerrarSesion
  }}>{children}</AuthContext.Provider>;
};

export { AuthProvider };

export default AuthContext;
