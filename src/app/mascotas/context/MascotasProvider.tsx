import { createContext, useContext, useState } from "react";
import { ReponseWerbService } from "../../../config/WebService";

import AuthContext from "../../auth/context/AuthProvider";
import Swal from "sweetalert2";
import { buscarMascotaAPI, eliminarMascotaAPI, obtenerMascotasClienteAPI } from "../api/mascotasCliente.api";
import { obtenerEspeciesAPI } from "../../especies/api/especies.api";
import { obtenerRazasAPI } from "../../razas/api/razas.api";
import { buscarClienteAPI } from "../../clientes/api/clientes.api";
import ClientesContext from "../../clientes/context/ClientesProvider";

const MascotasContext = createContext<any>({});

const MascotasProvider = ({ children }: any) => {

  const { setAlerta } = useContext(AuthContext)
  const { setCliente, cliente } = useContext(ClientesContext)

  const [mascotas, setMascotas] = useState<any>([])
  const [especies, setEspecies] = useState<any>([])
  const [razas, setRazas] = useState<any>([])

  const [openForm, setOpenForm] = useState(false);
  const [openMascotas, setOpenMascotas] = useState(false);
  const [editando, setEditando] = useState(false)

  const [mascota, setMascota] = useState<any>({
    id_especie: 0,
    id_raza: 0,
    nombre: '',
    edad: 0,
    color: '',
  })


  const obtenerMascotas = async (cliente_id: number) => {
    const res = await buscarClienteAPI(cliente_id)
    if (res.error) {
      return
    }

    setCliente(res.data)

    const { error, message, data }: ReponseWerbService = await obtenerMascotasClienteAPI(cliente_id)

    if (error) {
      setAlerta({ error: error, msg: message })
      setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
      return
    }

    setMascotas(data)
    setOpenMascotas(true)
  }

  const buscarMascota = async (mascota_id: number) => {
    setEditando(true)
    setOpenForm(true)

    setMascota({ id_mascota: mascota_id })

    const { error, data } = await buscarMascotaAPI(cliente.id_usuario, mascota_id)

    if (error) {
      // setAlerta({ error, msg: message })
      // setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
      return
    }

    await obtenerRazas(data.id_especie) 

    setMascota(data)
  }

  const eliminarMascota = (mascota_id: number) => {

    Swal.fire({
      icon: "warning",
      title: "¿Desea inactivar las mascota?",
      text: "Esta acción puede generar errores",
      confirmButtonText: "Eliminar",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { message } = await eliminarMascotaAPI(cliente.id_usuario, mascota_id, 2)

        const mascotas_actual = mascotas.filter((emp: any) => emp.id_mascota !== mascota_id)
        if (mascotas_actual) {
          setMascotas(mascotas_actual)

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


  const obtenerEspecies = async () => {
    const { error, data } = await obtenerEspeciesAPI()
    if (error) {
      // setAlerta({error, msg: message})
      // setTimeout(() => setAlerta({error: false, msg: ''}), 3000)
      return
    }

    setEspecies(data)
  }

  const obtenerRazas = async (especie_id: number) => {
    const { error, data } = await obtenerRazasAPI(especie_id)
    if (error) {
      // setAlerta({error, msg: message})
      // setTimeout(() => setAlerta({error: false, msg: ''}), 3000)
      return
    }

    setRazas(data)
  }

  return <MascotasContext.Provider value={{
    obtenerMascotas,
    mascotas, setMascotas,
    mascota, setMascota,
    editando, setEditando,
    buscarMascota, eliminarMascota,
    openMascotas, setOpenMascotas,
    openForm, setOpenForm,
    especies, setEspecies,
    obtenerEspecies, obtenerRazas,
    razas, setRazas
  }}>{children}</MascotasContext.Provider>;
};

export { MascotasProvider };

export default MascotasContext;
