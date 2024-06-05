import { useContext, useEffect, useState } from "react";
import EmpleadosContext from "../context/EmpleadosProvider";
import DataTable from "react-data-table-component";
import ModalAgregar from "../components/ModalAgregar";
import { Button } from "@mui/material";
import Icons from "../../../../public/assets/Icons";
import { buscarEmpleadoAPI, eliminarEmpleadoAPI } from "../api/empleados.api";
import Swal from "sweetalert2";

export const Empleados = () => {

  const { obtenerEmpleados, empleados, setEmpleados, setEditando, setEmpleado } = useContext(EmpleadosContext);

  const [open, setOpen] = useState(false);


  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const buscarEmpleado = async (empleado_id: number) => {
    setEditando(true)
    setOpen(true)

    setEmpleado({ id_empleado: empleado_id })

    const { error, data } = await buscarEmpleadoAPI(empleado_id)

    if (error) {
      // setAlerta({ error, msg: message })
      // setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
      return
    }

    setEmpleado(data)
  }

  const eliminarEmpleado = (empleado_id: number) => {

    Swal.fire({
      icon: "warning",
      title: "¿Desea inactivar el empleado?",
      text: "Esta acción puede generar errores",
      confirmButtonText: "Eliminar",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { message } = await eliminarEmpleadoAPI(empleado_id, 2)

        const empleados_actual = empleados.filter((emp: any) => emp.id_usuario !== empleado_id)
        if (empleados_actual) {
          setEmpleados(empleados_actual)

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
          <Button variant="outlined" color="primary" onClick={_ => buscarEmpleado(row.id_usuario)} size="small">{Icons['pencil']}</Button>
          <Button variant="outlined" color="error" onClick={_ => eliminarEmpleado(row.id_usuario)} size="small">{Icons['trash']}</Button>
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
        <Button variant="contained" color="primary" onClick={_ => { setEditando(false); setOpen(true) }}>Agregar</Button>
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
