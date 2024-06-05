import logo_clinica from '/img/logo_short.svg'
import Icons from '../../public/assets/Icons'
import AuthContext from '../app/auth/context/AuthProvider'
import { useContext } from 'react'

const Navbar = () => {

    const { sideOpen, setSideOpen } = useContext(AuthContext)

    return (
        <nav className="bg-white w-full py-3 px-2 border-b">
            <div className="flex justify-between items-center">
                <div>
                    <button className='bg-app-blue w-10 h-10 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all' onClick={() => setSideOpen(!sideOpen)}>
                        {sideOpen ? Icons['x'] : Icons['burger']}
                    </button>
                </div>

                <div className="flex items-center">
                    <img src={logo_clinica} alt="logo" className="w-14" />
                    {/* <span className="ml-3 text-xl font-bold">
                        Veterinaria Mis Mascotas
                    </span> */}
                </div>

                <div className="flex items-center">
                    PERFIL
                </div>
            </div>
        </nav>
    )
}

export default Navbar