import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"
import Navbar from "../components/Navbar"

const PrivateLayout = () => {

    return (
        <main className="flex bg-gray-50">
            <SideBar />
            <div className="w-full">
                <Navbar />
                <Outlet />
            </div>
        </main>
    )
}

export default PrivateLayout