import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import Formulario from './Formulario';
import ClientesContext from '../context/ClientesProvider';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function ModalAgregar({ open, setOpen }: { open: boolean, setOpen: any }) {
    const { setCliente, editando, setEditando } = useContext(ClientesContext)


    const handleClose = () => {
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
        setOpen(false);
        setEditando(false)
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5">
                        {editando ? 'Editar' : 'Agregar'} Cliente
                    </Typography>
                    <Formulario {...{  handleClose }} />
                </Box>
            </Modal>
        </div>
    );
}
