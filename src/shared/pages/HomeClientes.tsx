import { Outlet } from "react-router-dom"

const HomeClientes = () => {
    return (
        <section className="my-5 mx-10">
            <Outlet />
        </section>
    )
}

export default HomeClientes