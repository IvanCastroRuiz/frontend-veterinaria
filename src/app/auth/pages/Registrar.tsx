import { Link } from 'react-router-dom'
import Formulario from "../../clientes/components/Formulario";
import gato_fondo_azul from "/img/gato_fondo_azul.svg"
import logo_clinica from "/img/logo_clinica.svg"

export const Registrar = () => {
  return (

    <>
      <main className="flex">
        <section className="flex-1">
          <img src={gato_fondo_azul} alt="logo" className="h-svh" />
        </section>

        <section className="flex-1 flex flex-col justify-center items-center">
          <img className="mb-3" src={logo_clinica} alt="logo" />
          <Formulario  />

          <div className='flex justify-around px-4 mt-5 text-slate-500 w-full '>
              <Link  to="/" className=''>Ya tengo cuenta.  </Link>
              <Link to="/olvide-password">Olvide mi password.</Link>
          </div>

        </section>
      </main>    
    </>




      
  )
}
export default Registrar; 
