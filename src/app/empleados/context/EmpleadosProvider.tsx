import { createContext, useContext, useState } from "react";
import { obtenerEmpleadosAPI } from "../api/empleados.api";
import { ReponseWerbService } from "../../../config/WebService";

import AuthContext from "../../auth/context/AuthProvider";

const EmpleadosContext = createContext<any>({});

const EmpleadosProvider = ({ children }: any) => {

  const { setAlerta } = useContext(AuthContext)

  const [empleados, setEmpleados] = useState<any>([])

  const [editando, setEditando] = useState(false)

  const [empleado, setEmpleado] = useState<any>({
    id_empleado: 0,
    id_tipo_doc: 0,
    nombres: '',
    apellidos: '',
    cedula: '',
    correo: '',
    telefono: '',
    direccion: '',
    contrasena: '',
    confirmarContrasena: '',
  })


  const obtenerEmpleados = async () => {
    const { error, message, data }: ReponseWerbService = await obtenerEmpleadosAPI()

    if (error) {
      setAlerta({ error: error, msg: message })
      setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
      return
    }

    setEmpleados(data)
  }

  return <EmpleadosContext.Provider value={{
    obtenerEmpleados,
    empleados, setEmpleados,
    empleado, setEmpleado,
    editando, setEditando
  }}>{children}</EmpleadosContext.Provider>;
};

export { EmpleadosProvider };

export default EmpleadosContext;
