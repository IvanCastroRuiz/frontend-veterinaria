import gato_fondo_azul from "../img/gato_fondo_azul.svg"
import logo_clinica from "../img/logo_clinica.svg"


import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <img src={gato_fondo_azul} alt="logo" className="h-svh" />

      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <img src={logo_clinica} alt="logo" />

        <form className="w-full max-w-md mx-auto mt-10">
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold">
              Correo
            </label>
            <input type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl" />
          </div>
          <input
            type="Inicio de seccion"
            value="Iniciar Seccion"
            className="bg-blue-400 w-full max-w-md py-3 rounded-xl text-black uppercase font-bold
            mt-5 hover:cursor-pointer hover:bg-blue-600 text-center"
          />
        </form>
        <nav className='mt-10 '>
          <Link
            className='block text-center my-5 text-gr-500'
            to="/registrar">¿No tienes una cuenta? Registrate</Link>
          <Link
            className='block text-center my-5 text-gr-500'
            to="/olvide-password">Olvide mi contraseña</Link>


        </nav>
      </div>
    </div>
  )
}


export default Login;
