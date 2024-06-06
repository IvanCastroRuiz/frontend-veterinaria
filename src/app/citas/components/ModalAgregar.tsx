import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import Formulario from './Formulario';
import CitasContext from '../context/CitasProvider';

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
    const { setProducto, editando, setEditando } = useContext(CitasContext)


    const handleClose = () => {
        setProducto({
            id_producto: 0,
            referencia: '',
            nombre: '',
            cantidad: 0,
            id_unidad: 0,
            fecha_vencimiento: '',
            precio_costo: 0,
            precio_venta: 0,
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
                        {editando ? 'Editar' : 'Agregar'} Producto
                    </Typography>
                    <Formulario {...{ handleClose }} />
                </Box>
            </Modal>
        </div>
    );
}
