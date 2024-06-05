import { Outlet } from "react-router-dom"

const HomeAdmin = () => {
    return (
        <section className="my-5 mx-10">
            <Outlet />
        </section>
    )
}

export default HomeAdmin