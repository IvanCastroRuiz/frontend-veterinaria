import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '@mui/material';
import Icons from '../../../../public/assets/Icons';
import MascotasContext from '../context/MascotasProvider';
import ModalAgregarMascota from './ModalAgregarMascota';
import ClientesContext from '../../clientes/context/ClientesProvider';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ModalMascotasCliente({ open, setOpen }: { open: boolean, setOpen: any }) {
  const { mascotas, setMascotas, buscarMascota, eliminarMascota, openForm, setOpenForm, setEditando } = useContext(MascotasContext)
  const { setCliente, cliente } = useContext(ClientesContext)

  const handleClose = () => {
    setMascotas([])
    setOpen(false);
    setCliente({
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
  }


  const columns = [
    {
      name: 'Nombre',
      selector: (row: any) => row.nombre,
      sortable: true,
    },
    {
      name: 'Edad Mes(es)',
      selector: (row: any) => row.edad,
      sortable: true,
    },
    {
      name: 'Especie',
      selector: (row: any) => row.especie,
      sortable: true,
    },
    {
      name: 'Raza',
      selector: (row: any) => row.raza,
      sortable: true,
    },
    {
      name: 'Color',
      selector: (row: any) => row.color,
      sortable: true,
    },
    {
      name: 'Acciones',
      selector: (row: any) => (
        <div className="flex gap-3">
          <Button variant="outlined" color="primary" onClick={_ => buscarMascota(row.id_mascota)} size="small" title="Editar">{Icons['pencil']}</Button>
          <Button variant="outlined" color="error" onClick={_ => eliminarMascota(row.id_mascota)} size="small" title="Inactivar">{Icons['trash']}</Button>
        </div>
      ),
      sortable: true,
    },
  ];


  return (
    <div>
      <Modal
        sx={{ zIndex: 1000 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5">
            Mascotas Cliente - <span className='truncate'>{cliente.nombres} {cliente.apellidos}</span>
          </Typography>

          <section className="mt-10 mb-2">
            <Button variant="contained" color="primary" onClick={_ => { setOpenForm(true); setEditando(false) }}>Agregar</Button>
          </section>

          <DataTable
            columns={columns}
            data={mascotas}
            pagination
            persistTableHead
          />
        </Box>
      </Modal>
      <ModalAgregarMascota open={openForm} setOpen={setOpenForm} />
    </div >
  );
}
