import { useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import ModalAgregar from "../components/ModalAgregar";
import { Button } from "@mui/material";
import Icons from "../../../../public/assets/Icons";
import CitasContext from "../context/CitasProvider";

export const Citas = () => {

  const { obtenerCitas, citas, setEditando, open, setOpen, buscarProducto, eliminarProducto } = useContext(CitasContext);


  useEffect(() => {
    obtenerCitas();
  }, []);


  const columns = [
    {
      name: 'Cliente',
      selector: (row: any) => row.nombre_cliente,
      sortable: true,
    },

    {
      name: 'Mascota',
      selector: (row: any) => row.nombre_mascota,
      sortable: true,
    },
    {
      name: 'Medico',
      selector: (row: any) => row.nombre_veterinario,
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: (row: any) => row.fecha,
      sortable: true,
    },
    {
      name: 'Total Cita',
      selector: (row: any) => row.total_cita,
      sortable: true,
    },
    {
      name: 'Acciones',
      selector: (row: any) => (
        <div className="flex gap-3">
          <Button variant="outlined" color="primary" onClick={_ => buscarProducto(row.id_producto)} size="small">{Icons['pencil']}</Button>
          <Button variant="outlined" color="error" onClick={_ => eliminarProducto(row.id_producto)} size="small">{Icons['trash']}</Button>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="card">
      <h1 className="font-black text-6xl">Citas</h1>

      <ModalAgregar open={open} setOpen={setOpen} />

      <section className="mt-10 mb-2">
        <Button variant="contained" color="primary" onClick={_ => { setEditando(false); setOpen(true) }}>Agregar</Button>
      </section>

      <DataTable
        columns={columns}
        data={citas}
        pagination
        persistTableHead
      />
    </div>
  );
}


export default Citas;
