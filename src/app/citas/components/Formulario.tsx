import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { ProductoSchema } from '../citas.zod'
import { editarProductoAPI, guardarProductoAPI } from '../api/citas.api'
import AuthContext from '../../auth/context/AuthProvider'
import Alerta from '../../../components/Alerta'
import CitasContext from '../context/CitasProvider'
import ClientesContext from '../../clientes/context/ClientesProvider'
import MascotasContext from '../../mascotas/context/MascotasProvider'

interface FormularioProps {
    handleClose: () => void
}

const Formulario = ({ handleClose }: FormularioProps) => {
    const { alerta, setAlerta } = useContext(AuthContext)
    const { productos, setProductos, cita, setCita, editando } = useContext(CitasContext)
    const { obtenerClientes, clientes } = useContext(ClientesContext)
    const { obtenerMascotas, mascotas } = useContext(MascotasContext)

    const [erroresForm, setErroresForm] = useState<{ [key: string]: string | number }>({
        id_cliente: '',
        id_mascota: '',
        id_veterinario: '',
        fecha: '',
        observaciones: '',
        total_cita: '',
    })

    useEffect(() => {
        obtenerClientes()
    }, [])

    const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if(name === 'id_cliente') { obtenerMascotas(value) }

        setCita({ ...cita, [name]: ['id_cliente', 'id_mascota', 'id_veterinario', 'total_cita'  ].includes(name) ? Number(value) : value })
        setErroresForm({ ...erroresForm, [name]: '' })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result: any = ProductoSchema.safeParse(cita)

        if (!result.success) {
            setErroresForm({ [result.error?.issues[0].path[0]]: result.error?.issues[0].message })
            return
        }

        if (editando) {
            const { error, message, data } = await editarProductoAPI(cita.id_producto, cita)

            if (error) {
                setAlerta({ error, msg: message || message[0] })
                setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
                return
            }

            const producto_actual = productos.map((item: any) => item.id_producto === cita.id_producto ? data : item)

            setProductos(producto_actual)

        } else {
            const { error, message, data } = await guardarProductoAPI(cita)

            if (error) {
                setAlerta({ error, msg: message || message[0] })
                setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
                return
            }

            setProductos([data, ...productos])
        }

        Swal.fire({
            title: `Exitoso`,
            text: `¡Se ha ${editando ? 'editado' : 'agregado'} el producto!`,
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
                        <label className="text-sm">Cliente</label>
                        <select name="id_cliente" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.id_cliente ? 'border-red-700' : 'border-gray-200'}`} onChange={e => changeInput(e)} value={cita.id_cliente}>
                            <option value="">-- Seleccione --</option>
                            {clientes.map((item: any) => (
                                <option key={item.id_usuario} value={item.id_usuario}>{item.nombres} {item.apellidos}</option>
                            ))}
                        </select>
                        <small className='text-red-700 font-semibold'>{erroresForm.id_cliente}</small>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Mascota</label>
                        <select name="id_mascota" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.id_mascota ? 'border-red-700' : 'border-gray-200'}`} onChange={e => changeInput(e)} value={cita.id_mascota}>
                            <option value="">-- Seleccione --</option>
                            {mascotas.map((item: any) => (
                                <option key={item.id_mascota} value={item.id_mascota}>{item.nombre}</option>
                            ))}
                        </select>
                        <small className='text-red-700 font-semibold'>{erroresForm.id_mascota}</small>
                    </div>
                </div>
                {/* <div className="flex flex-row">
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Cliente</label>
                        <select name="id_unidad" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.id_unidad ? 'border-red-700' : 'border-gray-200'}`} onChange={e => changeInput(e)} value={cita.id_cliente}>
                            <option value="">-- Seleccione --</option>
                            {clientes.map((item: any) => (
                                <option key={item.id_usuario} value={item.id_usuario}>{item.nombres} {item.apellidos}</option>
                            ))}
                        </select>
                        <small className='text-red-700 font-semibold'>{erroresForm.id_unidad}</small>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Nombre</label>
                        <input type="text" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.nombre ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: Tornillo' value={cita.nombre} onChange={e => changeInput(e)} name="nombre" />
                        <small className='text-red-700 font-semibold'>{erroresForm.nombre}</small>
                    </div>
                </div> */}

                <div className="w-full flex justify-end gap-3">
                    <button className="transition-all bg-gray-400 w-full py-1 px-10 rounded text-black uppercase font-bold mt-5 hover:cursor-pointer hover:bg-gray-600 md:w-auto" onClick={handleClose}>Cancelar</button>
                    <input type="submit" value="Guardar" className="transition-all bg-blue-400 w-full py-1 px-10 rounded text-black uppercase font-bold mt-5 hover:cursor-pointer hover:bg-blue-600 md:w-auto" />
                </div>
            </div>
        </form>
    )
}

export default Formulario