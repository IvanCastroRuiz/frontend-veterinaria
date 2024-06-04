import { useContext, useEffect, useState } from "react";
import EmpleadosContext from "../context/EmpleadosProvider";
import DataTable from "react-data-table-component";
import ModalAgregar from "../components/ModalAgregar";
import { Button } from "@mui/material";
import Icons from "../../../../public/assets/Icons";

export const Empleados = () => {

  const { obtenerEmpleados, empleados } = useContext(EmpleadosContext);

  const [open, setOpen] = useState(false);


  useEffect(() => {
    obtenerEmpleados();
  }, []);

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
      selector: (_: any) => (
        <div className="flex gap-3">
          <Button variant="outlined" color="primary" onClick={_ => setOpen(true)} size="small">{Icons['pencil']}</Button>
          <Button variant="outlined" color="error" onClick={_ => setOpen(true)} size="small">{Icons['trash']}</Button>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="card">
      <h1 className="font-black text-6xl">Empleados</h1>
      
      <ModalAgregar open={open} setOpen={setOpen} />

      <section className="mt-10 mb-2">
        <Button variant="contained" color="primary" onClick={_ => setOpen(true)}>Agregar</Button>
      </section>

      <DataTable
        columns={columns}
        data={empleados}
        pagination
        // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        // subHeader
        // subHeaderComponent={<FilterComponent />}
        persistTableHead
      />
    </div>
  );
}


export default Empleados;
