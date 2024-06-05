import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EmpleadosContext from '../context/EmpleadosProvider';
import { useContext, useEffect, useState } from 'react';
import { obtenerTipoDocsAPI } from '../../../shared/api/global.api';
import AuthContext from '../../auth/context/AuthProvider';

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
    const { empleado, setEmpleado } = useContext(EmpleadosContext)
    const { setAlerta } = useContext(AuthContext)

    const [tipoDocs, setTipoDocs] = useState([])

    useEffect(() => {


        (async () => {
            const { error, message, data } = await obtenerTipoDocsAPI()

            if (error) {
                setAlerta({ error, msg: message })
                setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
                return
            }

            setTipoDocs(data)
        })()

    }, [])

    const handleClose = () => setOpen(false);

    const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(empleado)
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
                        Agregar Empleado
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <div className="w-1/2 p-2">
                                    <label className="text-sm">Tipo Documento</label>
                                    <select name="id_tipo_doc" className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg" onChange={e => changeInput(e)} value={empleado.id_tipo_doc}>
                                        <option value="">-- Seleccione --</option>
                                        {tipoDocs.map((tipoDoc: { id_tipo_doc: number, nombre: string }) => (
                                            <option key={tipoDoc.id_tipo_doc} value={tipoDoc.id_tipo_doc}>{tipoDoc.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-1/2 p-2">
                                    <label className="text-sm">No. Documento</label>
                                    <input type="text" className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg" value={empleado.cedula} placeholder='Ej: 0000000001' onChange={e => changeInput(e)} name="cedula" />
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="w-1/2 p-2">
                                    <label className="text-sm">Nombre</label>
                                    <input type="text" className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg" placeholder='Ej: Jhon Lucas' value={empleado.nombres} onChange={e => changeInput(e)} name="nombres" />
                                </div>
                                <div className="w-1/2 p-2">
                                    <label className="text-sm">Apellido</label>
                                    <input type="text" className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg" placeholder='Ej: Doe Orion' value={empleado.apellidos} onChange={e => changeInput(e)} name="apellidos" />
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="w-1/2 p-2">
                                    <label className="text-sm">Email</label>
                                    <input type="email" className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg" placeholder='Ej: jhon.lucas@gmail.com' value={empleado.correo} onChange={e => changeInput(e)} name="correo" />
                                </div>
                                <div className="w-1/2 p-2">
                                    <label className="text-sm">Telefono</label>
                                    <input type="text" className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg" placeholder='Ej: 999999999' value={empleado.telefono} onChange={e => changeInput(e)} name="telefono" />
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="w-full p-2">
                                    <label className="text-sm">Dirección</label>
                                    <input type="text" className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg" placeholder='Ej: Calle 1, 12345 Córdoba, Argentina' value={empleado.direccion} onChange={e => changeInput(e)} name="direccion" />
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="w-1/2 p-2">
                                    <label className="text-sm">Contraseña</label>
                                    <input type="password" className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg" placeholder='Ej: 12345678' value={empleado.contrasena} onChange={e => changeInput(e)} name="contrasena" />
                                </div>
                                <div className="w-1/2 p-2">
                                    <label className="text-sm">Confirmar Contraseña</label>
                                    <input type="password" className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg" value={empleado.confirmarContrasena} onChange={e => changeInput(e)} name="confirmarContrasena" />
                                </div>
                            </div>
                            <div className="w-full flex justify-end gap-3">
                                <button className="transition-all bg-gray-400 w-full py-1 px-10 rounded text-black uppercase font-bold mt-5 hover:cursor-pointer hover:bg-gray-600 md:w-auto" onClick={handleClose}>Cancelar</button>
                                <input type="submit" value="Agregar" className="transition-all bg-blue-400 w-full py-1 px-10 rounded text-black uppercase font-bold mt-5 hover:cursor-pointer hover:bg-blue-600 md:w-auto" />
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
