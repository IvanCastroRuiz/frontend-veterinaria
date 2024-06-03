import FormularioLogin from "../components/FormularioLogin";
import gato_fondo_azul from "../../../img/gato_fondo_azul.svg"


export const Login = () => {
  return (
    <main className="flex">
      <section className="flex-1">
        <img src={gato_fondo_azul} alt="logo" className="h-svh" />

      </section>

      <section className="flex-1 flex flex-col justify-center items-center">
        <FormularioLogin />
      </section>
    </main>
  )
}


export default Login;
