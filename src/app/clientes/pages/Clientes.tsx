import { useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import ModalAgregar from "../components/ModalAgregar";
import { Button } from "@mui/material";
import Icons from "../../../../public/assets/Icons";
import ClientesContext from "../context/ClientesProvider";
import ModalMascotasCliente from "../../mascotas/components/ModalMascotasCliente";
import MascotasContext from "../../mascotas/context/MascotasProvider";

export const Clientes = () => {

  const { obtenerClientes, clientes, setEditando, buscarCliente, eliminarCliente, open, setOpen } = useContext(ClientesContext);

  const { openMascotas, setOpenMascotas, obtenerMascotas } = useContext(MascotasContext)

  useEffect(() => { obtenerClientes() }, []);

  const columns = [
    {
      name: 'Nombres',
      selector: (row: any) => row.nombres,
      sortable: true,
    },
    {
      name: 'Apellidos',
      selector: (row: any) => row.apellidos,
      sortable: true,
    },
    {
      name: 'Cedula',
      selector: (row: any) => row.cedula,
      sortable: true,
    },
    {
      name: 'Direccion',
      selector: (row: any) => row.direccion,
      sortable: true,
    },
    {
      name: 'Correo',
      selector: (row: any) => row.correo,
      sortable: true,
    },
    {
      name: 'Acciones',
      selector: (row: any) => (
        <div className="flex gap-3">
          <Button variant="outlined" color="primary" onClick={_ => buscarCliente(row.id_usuario)} size="small" title="Editar">{Icons['pencil']}</Button>
          <Button variant="outlined" color="success" onClick={_ => obtenerMascotas(row.id_usuario)} size="small" title="Mascotas">{Icons['mascotas']}</Button>
          <Button variant="outlined" color="error" onClick={_ => eliminarCliente(row.id_usuario)} size="small" title="Inactivar">{Icons['trash']}</Button>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="card">
      <h1 className="font-black text-6xl">Clientes</h1>


      <section className="mt-10 mb-2">
        <Button variant="contained" color="primary" onClick={_ => { setEditando(false); setOpen(true) }}>Agregar</Button>
      </section>

      <DataTable
        columns={columns}
        data={clientes}
        pagination
        persistTableHead
      />
      <ModalAgregar open={open} setOpen={setOpen} />
      <ModalMascotasCliente open={openMascotas} setOpen={setOpenMascotas} />
    </div>
  );
}


export default Clientes;
