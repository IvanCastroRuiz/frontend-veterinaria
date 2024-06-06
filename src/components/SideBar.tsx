import { Link, useLocation } from "react-router-dom"
import logo_clinica from "/img/logo_short.svg"
import { redirectUser } from "../shared/constants"
import { useContext } from "react"
import AuthContext from "../app/auth/context/AuthProvider"
import Icons from "../../public/assets/Icons"

interface Menu {
    id_menu: number
    nombre: string
    url: string
}

const SideBar = () => {
    const { sideOpen, cerrarSesion } = useContext(AuthContext)

    const usuario = JSON.parse(localStorage.getItem('usuario') ?? '')
    const menus = JSON.parse(localStorage.getItem('menus') ?? '')


    const location = useLocation()

    return (
        <div className={`transition-all max-w-64 border-r h-svh static px-2 bg-white ${!sideOpen ? 'w-20' : 'w-64'}`}>
            <div className="flex py-2 border-b gap-2">
                <Link to={redirectUser[usuario.perfiles[0].id_perfil]} className="overflow-hidden border rounded-full">
                    <img src={logo_clinica} alt="Logo" className="max-w-16" />
                </Link>
                {
                    sideOpen && (
                        <div className="overflow-hidden">
                            <p className="truncate">{usuario.nombres} {usuario.apellidos}</p>
                            <p className="truncate text-slate-400">{usuario.perfiles[0].nombre}</p>
                        </div>
                    )
                }
            </div>
            <ul className="py-3 border-b h-[87%]">
                {menus.map((menu: Menu) => (

                    <li key={menu.id_menu} className={`mb-2 text-gray-500 hover:bg-app-blue hover:cursor-pointer rounded-lg py-1 px-2 overflow-hidden ${location.pathname.includes(menu.url) ? 'bg-app-blue text-black' : ''}`}>
                        <Link to={`${redirectUser[usuario.perfiles[0].id_perfil]}${menu.url}`} title={menu.nombre} className={`font-semibold truncate flex gap-2  ${!sideOpen && 'justify-center'} ${location.pathname.includes(menu.url) && 'text-black'}`}>
                            <span>{Icons[menu.nombre.toLowerCase()]}</span> 
                            <span className={`${!sideOpen && 'hidden'}`}>
                                {sideOpen && menu.nombre}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
            <footer className="py-3">
                <button className={`flex items-center gap-2 text-gray-500 w-full py-1 px-2 hover:text-black font-semibold ${!sideOpen && 'justify-center'}`} onClick={cerrarSesion}>
                    {Icons['cerrar_session']}
                    {sideOpen && (<p>Cerrar Sesión</p>)}
                </button>
            </footer>
        </div>
    )
}

export default SideBar