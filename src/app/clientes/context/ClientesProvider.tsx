import { createContext, useContext, useState } from "react";
import { buscarClienteAPI, eliminarClienteAPI, obtenerClientesAPI } from "../api/clientes.api";
import { ReponseWerbService } from "../../../config/WebService";

import AuthContext from "../../auth/context/AuthProvider";
import Swal from "sweetalert2";

const ClientesContext = createContext<any>({});

const ClientesProvider = ({ children }: any) => {

  const { setAlerta } = useContext(AuthContext)

  const [clientes, setClientes] = useState<any>([])

  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState(false)

  const [cliente, setCliente] = useState<any>({
    id_usuario: 0,
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


  const obtenerClientes = async () => {
    const { error, message, data }: ReponseWerbService = await obtenerClientesAPI()

    if (error) {
      setAlerta({ error: error, msg: message })
      setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
      return
    }

    setClientes(data)
  }

  const buscarCliente = async (cliente_id: number) => {
    setEditando(true)
    setOpen(true)

    setCliente({ id_empleado: cliente_id })

    const { error, data } = await buscarClienteAPI(cliente_id)

    if (error) {
      // setAlerta({ error, msg: message })
      // setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
      return
    }

    setCliente(data)
  }


  const eliminarCliente = (cliente_id: number) => {

    Swal.fire({
      icon: "warning",
      title: "¿Desea inactivar el cliente?",
      text: "Esta acción puede generar errores",
      confirmButtonText: "Eliminar",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { message } = await eliminarClienteAPI(cliente_id, 2)

        const clientes_actual = clientes.filter((emp: any) => emp.id_usuario !== cliente_id)
        if (clientes_actual) {
          setClientes(clientes_actual)

          Swal.fire({
            title: `Exitoso`,
            text: `${message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });

  }

  return <ClientesContext.Provider value={{
    obtenerClientes,
    clientes, setClientes,
    cliente, setCliente,
    editando, setEditando,
    buscarCliente, eliminarCliente,
    open, setOpen
  }}>{children}</ClientesContext.Provider>;
};

export { ClientesProvider };

export default ClientesContext;
