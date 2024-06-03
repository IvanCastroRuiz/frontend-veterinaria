import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"

const PrivateLayout = () => {

    return (
        <div className="flex">
            <SideBar />
            <Outlet />
        </div>
    )
}

export default PrivateLayout