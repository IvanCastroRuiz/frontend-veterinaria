import {useState}from 'react'
import { Link } from "react-router-dom";
import { Alerta } from '../components/Alerta';
import  gato_fondo_azul  from "../img/gato_fondo_azul.svg"
import  logo_clinica from "../img/logo_clinica.svg"


export const Registrar = () => {
  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ Password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')

  const [alerta,setAlerta] = useState({})

  const handleSubmit = e => {
    e.preventDefault();
    
    if([nombre,email,Password,repetirPassword].includes('')){
      setAlerta({msg:'Hay campos vacios',error:true})
      return ;
      
    }
    if(Password!== repetirPassword){
      setAlerta({msg:'Loa Password no son iguales',error:true})
      return ;
    } 
     if(Password.length < 6 ){
      setAlerta({msg:'El Password es  muy corto , agrega minimo 6 caracteres',error:true})
      
      return ;
     } 
      setAlerta({})
  }
      const {msg} = alerta
  
    return (
    <>
        {<img src={gato_fondo_azul} alt="logo"/> }
        {<img src={logo_clinica} alt="logo" /> }

    <div>
    <h1 className="text-blue-400 font-black text-6xl">
      Crea Tu Cuenta En Veterinaria Mis Mascotas{""}
    </h1>
    <div className='mt-20 md:mt:5 shandow-lg px-5 py-10 rounded-xl bg-white'>
    </div>

         {msg && <Alerta
          alerta={alerta}
     /> }
    <form   
    onSubmit={handleSubmit}
    >
    <div className="my-5"
          >
          <label 
          className="uppercase text-gray-600 block text-xl font-bold">
            USUARIO
            </label>
            <input type="USUARIO" 
                placeholder="Usuario"
                className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
                value={nombre}
                onChange={ e => setNombre(e.target.value)}
                
                />
        </div>
        <div className="my-5">
        <label 
          className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
            </label>
            <input 
           type="Email"
           placeholder="Tu Email"
           className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
           value={email}
           onChange={ e => setEmail(e.target.value)}
           />
           
        </div>
        
        <label 
        className="uppercase text-gray-600 block text-xl font-bold"
        >
         PASSWORD
        </label>
        
        <input
            type="Password"
            placeholder="Tu Password"
            className="border w-full p-3 mt- bg-gray-200 rounded-xl"
            value={Password}
            onChange={ e => setPassword(e.target.value)}

            />
            <div className="my-5">

            </div>
            <label 
            className="uppercase text-black-50 block text-xl font-bold"
            >
              Repetir Password
            </label>
            <input 
                type="Password"
                placeholder="Repite tu password"
                className="border w-full p-3 bg-gray-200 rounded-xl"
                value={repetirPassword}
                onChange={ e => setRepetirPassword(e.target.value)}
 
            
            />
            <div>
              <input 
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-blue-400 w-full py-3 px-10 
                    rounded-xl text-black uppercase font-bold mt-5 hover:cursor-pointer 
                    hover:bg-blue-600 md:w-auto " />

            </div>
      </form>
      < nav className='mt-10 lg:flex lg:justify-between'>
        <Link
        className='block text-center my-5 text-gray-500'
        to="/">¿Ya tienes una cuenta? Iniciar Seccion</Link>
        <Link
        className='block text-center my-5 text-gray-500'
          to="/">¿No Tienes Una Cuenta? Registrate</Link>

      </nav>
      
    </div>
        





    </>
  )
}
export default  Registrar; 