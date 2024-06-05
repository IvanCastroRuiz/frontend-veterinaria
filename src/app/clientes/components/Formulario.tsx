import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { ClientesSchema } from '../clientes.zod'
import { editarClienteAPI, guardarClienteAPI } from '../api/clientes.api'
import AuthContext from '../../auth/context/AuthProvider'
import Alerta from '../../../components/Alerta'
import ClientesContext from '../context/ClientesProvider'

interface FormularioProps {
    handleClose: () => void
}

const Formulario = ({ handleClose }: FormularioProps) => {
    const { alerta, setAlerta } = useContext(AuthContext)
    const { clientes, setClientes, cliente, setCliente, editando } = useContext(ClientesContext)

    const [erroresForm, setErroresForm] = useState<{ [key: string]: string | number }>({
        id_tipo_doc: '',
        nombres: '',
        apellidos: '',
        cedula: '',
        correo: '',
        telefono: '',
        direccion: '',
        contrasena: '',
        confirmarContrasena: '',
    })


    const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setCliente({ ...cliente, [name]: name === 'id_tipo_doc' ? parseInt(value) : value })
        setErroresForm({ ...erroresForm, [name]: '' })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result: any = ClientesSchema.safeParse(cliente)

        if (!result.success) {
            setErroresForm({ [result.error?.issues[0].path[0]]: result.error?.issues[0].message })
            return
        }

        if (cliente.contrasena !== cliente.confirmarContrasena) {
            setErroresForm({ confirmarContrasena: 'Las contraseñas no coinciden' })
            return
        }

        if (editando) {
            const { error, message, data } = await editarClienteAPI(cliente.id_usuario, cliente)

            if (error) {
                setAlerta({ error, msg: message || message[0] })
                setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
                return
            }

            const cliente_actual = clientes.map((emp: any) => emp.id_usuario === cliente.id_usuario ? data : emp)

            setClientes(cliente_actual)

        } else {
            const { error, message, data } = await guardarClienteAPI(cliente)

            if (error) {
                setAlerta({ error, msg: message || message[0] })
                setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
                return
            }

            setClientes([data, ...clientes])
        }

        Swal.fire({
            title: `Exitoso`,
            text: `¡Se ha ${editando ? 'editado' : 'agregado'} el cliente!`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
        });

        handleClose()
    }

    return (
        <form onSubmit={handleSubmit}>
            {alerta.error && <Alerta />}
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Tipo Documento</label>
                        <select name="id_tipo_doc" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.id_tipo_doc ? 'border-red-700' : 'border-gray-200'}`} onChange={e => changeInput(e)} value={cliente.id_tipo_doc}>
                            <option value="">-- Seleccione --</option>
                            <option value="1">Cedula de Ciudadania</option>
                            <option value="2">Cedula de Extranjeria</option>
                            <option value="3">Pasaporte</option>
                        </select>
                        <small className='text-red-700 font-semibold'>{erroresForm.id_tipo_doc}</small>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="text-sm">No. Documento</label>
                        <input type="text" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.cedula ? 'border-red-700' : 'border-gray-200'}`} value={cliente.cedula} placeholder='Ej: 0000000001' onChange={e => changeInput(e)} name="cedula" />
                        <small className='text-red-700 font-semibold'>{erroresForm.cedula}</small>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Nombre</label>
                        <input type="text" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.nombres ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: Jhon Lucas' value={cliente.nombres} onChange={e => changeInput(e)} name="nombres" />
                        <small className='text-red-700 font-semibold'>{erroresForm.nombres}</small>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Apellido</label>
                        <input type="text" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.apellidos ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: Doe Orion' value={cliente.apellidos} onChange={e => changeInput(e)} name="apellidos" />
                        <small className='text-red-700 font-semibold'>{erroresForm.apellidos}</small>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Email</label>
                        <input type="email" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.correo ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: jhon.lucas@gmail.com' value={cliente.correo} onChange={e => changeInput(e)} name="correo" />
                        <small className='text-red-700 font-semibold'>{erroresForm.correo}</small>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Telefono</label>
                        <input type="text" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.telefono ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: 999999999' value={cliente.telefono} onChange={e => changeInput(e)} name="telefono" />
                        <small className='text-red-700 font-semibold'>{erroresForm.telefono}</small>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-full p-2">
                        <label className="text-sm">Dirección</label>
                        <input type="text" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.direccion ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: Calle 1, 12345 Córdoba, Argentina' value={cliente.direccion} onChange={e => changeInput(e)} name="direccion" />
                        <small className='text-red-700 font-semibold'>{erroresForm.direccion}</small>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Contraseña</label>
                        <input type="password" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.contrasena ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: 12345678' value={cliente.contrasena} onChange={e => changeInput(e)} name="contrasena" />
                        <small className='text-red-700 font-semibold'>{erroresForm.contrasena}</small>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Confirmar Contraseña</label>
                        <input type="password" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.confirmarContrasena ? 'border-red-700' : 'border-gray-200'}`} value={cliente.confirmarContrasena} onChange={e => changeInput(e)} name="confirmarContrasena" />
                        <small className='text-red-700 font-semibold'>{erroresForm.confirmarContrasena}</small>
                    </div>
                </div>
                <div className="w-full flex justify-end gap-3">
                    <button className="transition-all bg-gray-400 w-full py-1 px-10 rounded text-black uppercase font-bold mt-5 hover:cursor-pointer hover:bg-gray-600 md:w-auto" onClick={handleClose}>Cancelar</button>
                    <input type="submit" value="Guardar" className="transition-all bg-blue-400 w-full py-1 px-10 rounded text-black uppercase font-bold mt-5 hover:cursor-pointer hover:bg-blue-600 md:w-auto" />
                </div>
            </div>
        </form>
    )
}

export default Formulario