import { Link } from "react-router-dom"
import logo_clinica from "../img/logo_clinica.svg"

interface Menu {
    id_menu: number
    nombre: string
    url: string
}

const SideBar = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario') ?? '')
    const menus = JSON.parse(localStorage.getItem('menus') ?? '')

    return (
        <div className="w-64 border-r h-svh static">
            <div className="px-3 py-5 flex gap-2">
                <img src={logo_clinica} alt="Logo" className="h-10 rounded-full border" />
                <p className="truncate">{usuario.nombres} {usuario.apellidos}</p>
                <p className="truncate text-slate-400">{usuario.perfiles[0].nombre}</p>
            </div>
            <ul className="">
                {menus.map((menu: Menu) => (
                    <li key={menu.id_menu} className="text-gray-500 hover:text-black">
                        <Link to={menu.url}>{menu.nombre}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SideBar