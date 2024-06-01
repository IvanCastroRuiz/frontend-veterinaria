
import gato_fondo_naranja from "../img/gato_fondo_naranja.svg"
import logo_clinica from "../img/logo_clinica.svg"


import { Link } from 'react-router-dom'

export const OlvidePassword = () => {
  return (
    <>
      {<img src={gato_fondo_naranja} alt="logo" />}
      {<img src={logo_clinica} alt="logo" />}





      <div>
        <h1 className="text-orange-400 font-black text-6xl">
          Recupera Tu Cuenta En Veterinaria Mis Mascotas{""}
        </h1>
        <div className='mt-20 md:mt:5 shandow-lg px-5 py-10 rounded-xl bg-white'>
        </div>
        <form >
          <div className="my-5"
          >
            <label
              className="uppercase text-gray-600 block text-xl font-blue-400">
              EMAIL
            </label>
            <input
              type=" Email"
              placeholder="Email De Registro"
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
            />
          </div>
          <input
            type="submit"
            value="ENVIAR INSTRUCCIONES"
            className="bg-orange-400 w-full py-3 px-10 rounded-xl text-black upperca
                     font-bold mt-5 hover:cursor-pointer hover:bg-orange-600 md :w-auto" />


        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            to="/">¿Ya tienes una cuenta? Inicia Seccion</Link>
          <Link
            className='block text-ceter my/5 text-gray-500'
            to="/olvide-password">Olvide mi Password</Link>

        </nav>

      </div>






    </>
  )
}

export default OlvidePassword; 