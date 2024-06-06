import { createContext, useContext, useState } from "react";
import { buscarProductoAPI, eliminarProductoAPI, obtenerCitasAPI } from "../api/citas.api";
import { ReponseWerbService } from "../../../config/WebService";

import AuthContext from "../../auth/context/AuthProvider";
import Swal from "sweetalert2";

const CitasContext = createContext<any>({});

const CitasProvider = ({ children }: any) => {

  const { setAlerta } = useContext(AuthContext)

  const [citas, setCitas] = useState<any>([])

  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState(false)

  const [producto, setProducto] = useState<any>({
    id_producto: 0,
    referencia: '',
    nombre: '',
    cantidad: 0,
    id_unidad: 0,
    precio_costo: 0,
    precio_venta: 0,
  })


  const obtenerCitas = async () => {
    const { error, message, data }: ReponseWerbService = await obtenerCitasAPI()

    if (error) {
      setAlerta({ error: error, msg: message })
      setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
      return
    }

    setCitas(data)

  }

  
  const buscarProducto = async (id_producto: number) => {
    setEditando(true)
    setOpen(true)

    setProducto({...producto, id_producto })

    const { error, data } = await buscarProductoAPI(id_producto)

    if (error) {
      // setAlerta({ error, msg: message })
      // setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
      return
    }

    setProducto(data)
  }

  const eliminarProducto = (producto_id: number) => {

    Swal.fire({
      icon: "warning",
      title: "¿Desea inactivar el producto?",
      text: "Esta acción puede generar errores",
      confirmButtonText: "Eliminar",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { message } = await eliminarProductoAPI(producto_id, 2)

        const productos_actual = citas.filter((emp: any) => emp.id_cita !== producto_id)
        if (productos_actual) {
          setCitas(productos_actual)

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

  return <CitasContext.Provider value={{
    obtenerCitas,
    citas, setCitas,
    producto, setProducto,
    editando, setEditando,
    buscarProducto,
    open, setOpen,
    eliminarProducto
  }}>{children}</CitasContext.Provider>;
};

export { CitasProvider };

export default CitasContext;
