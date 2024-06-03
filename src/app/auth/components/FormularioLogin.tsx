
import { useContext, useState } from "react"
import logo_clinica from "../../../img/logo_clinica.svg"
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthProvider"
import { Login } from "../auth"
import Alerta from "../../../components/Alerta"

const FormularioLogin = () => {

    const { alerta, formLogin, setFormLogin, loginUsuario } = useContext(AuthContext)

    const [erroresForm, setErroresForm] = useState<Login>({
        correo: '',
        contrasena: '',
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (formLogin.correo === '') {
            setErroresForm({ ...erroresForm, correo: 'Ingrese su correo' })
            return
        }
        if (formLogin.contrasena === '') {
            setErroresForm({ ...erroresForm, contrasena: 'Ingrese su contraseña' })
            return
        }

        await loginUsuario(formLogin)
    }

    const handleChange = (e: any) => {
        setFormLogin({ ...formLogin, [e.target.name]: e.target.value })
        setErroresForm({ ...erroresForm, [e.target.name]: '' })
    }

    return (
        <>
            <img src={logo_clinica} alt="logo" />


            <form className="w-full max-w-md mx-auto mt-10" onSubmit={(e) => handleSubmit(e)}>
                {alerta.error && <Alerta />}
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold">
                        Correo
                    </label>
                    <input
                        type="email"
                        name="correo"
                        placeholder="Ingrese su correo"
                        className={`border w-full p-3 mt-3  bg-gray-200 rounded-xl ${erroresForm.correo ? 'border-red-700' : 'border-gray-200'}`}
                        onChange={(e) => handleChange(e)}
                    />
                    <small className="text-red-700">{erroresForm.correo}</small>
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="contrasena"
                        placeholder="Ingrese su contraseña"
                        className={`border w-full p-3 mt-3  bg-gray-200 rounded-xl ${erroresForm.contrasena ? 'border-red-700' : 'border-gray-200'}`}
                        onChange={(e) => handleChange(e)}
                    />
                    <small className="text-red-700">{erroresForm.contrasena}</small>
                </div>
                <input
                    type="submit"
                    value="Iniciar Sesion"
                    className="bg-blue-400 w-full max-w-md py-3 rounded-xl text-black uppercase font-bold mt-5 hover:cursor-pointer hover:bg-blue-600 text-center transition-all duration-300"
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
        </>
    )
}

export default FormularioLogin