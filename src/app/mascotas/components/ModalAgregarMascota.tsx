import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import MascotasContext from '../context/MascotasProvider';
import FormularioMascota from './FormularioMascota';

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

export default function ModalAgregarMascota({ open, setOpen }: { open: boolean, setOpen: any }) {
    const { setMascota, editando, setEditando } = useContext(MascotasContext)


    const handleClose = () => {
        setMascota({
            id_raza: 0,
            id_especie: 0,
            nombre: '',
            edad: 0,
            color: '',
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
                    <FormularioMascota {...{ handleClose }} />
                </Box>
            </Modal>
        </div>
    );
}
