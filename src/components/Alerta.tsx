import { useContext } from "react";
import AuthContext from "../app/auth/context/AuthProvider";

export const Alerta = () => {

  const { alerta } = useContext(AuthContext)

  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' :
      'from-blue-400 to-blue-600'} bg-gradient-to-br text-center p-3
      rounded-xl eppercase font-bold text-sm mb-10 text-white`}>

      {alerta.msg}
    </div>

  )
}
export default Alerta; 
