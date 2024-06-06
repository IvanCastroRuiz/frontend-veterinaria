import { useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import ModalAgregar from "../components/ModalAgregar";
import { Button } from "@mui/material";
import Icons from "../../../../public/assets/Icons";
import ProductosContext from "../context/ProductosProvider";

export const Productos = () => {

  const { obtenerProductos, productos, setEditando, open, setOpen, buscarProducto, eliminarProducto } = useContext(ProductosContext);


  useEffect(() => {
    obtenerProductos();
  }, []);


  const columns = [
    {
      name: 'Referencia',
      selector: (row: any) => row.referencia,
      sortable: true,
    },

    {
      name: 'Nombre',
      selector: (row: any) => row.nombre,
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: (row: any) => row.cantidad,
      sortable: true,
    },
    {
      name: 'Unidad de Medida',
      selector: (row: any) => row.unidad,
      sortable: true,
    },
    {
      name: 'Precio Costo',
      selector: (row: any) => row.precio_costo,
      sortable: true,
    },
    {
      name: 'Precio Venta',
      selector: (row: any) => row.precio_venta,
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
      <h1 className="font-black text-6xl">Productos</h1>

      <ModalAgregar open={open} setOpen={setOpen} />

      <section className="mt-10 mb-2">
        <Button variant="contained" color="primary" onClick={_ => { setEditando(false); setOpen(true) }}>Agregar</Button>
      </section>

      <DataTable
        columns={columns}
        data={productos}
        pagination
        persistTableHead
      />
    </div>
  );
}


export default Productos;
