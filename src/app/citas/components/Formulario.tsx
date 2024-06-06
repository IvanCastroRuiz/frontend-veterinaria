import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { ProductoSchema } from '../citas.zod'
import { editarProductoAPI, guardarProductoAPI } from '../api/citas.api'
import AuthContext from '../../auth/context/AuthProvider'
import Alerta from '../../../components/Alerta'
import CitasContext from '../context/CitasProvider'

interface FormularioProps {
    handleClose: () => void
}

const Formulario = ({ handleClose }: FormularioProps) => {
    const { alerta, setAlerta } = useContext(AuthContext)
    const { productos, setProductos, producto, setProducto, editando, obtenerUnidadesMedida, unidadesMedida } = useContext(CitasContext)

    const [erroresForm, setErroresForm] = useState<{ [key: string]: string | number }>({
        referencia: '',
        nombre: '',
        cantidad: '',
        id_unidad: '',
        precio_costo: '',
        precio_venta: '',
    })

    useEffect(() => {
        obtenerUnidadesMedida()
    }, [])

    const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setProducto({ ...producto, [name]: ['id_producto', 'id_unidad', 'cantidad', 'precio_costo', 'precio_venta'].includes(name) ? Number(value) : value })
        setErroresForm({ ...erroresForm, [name]: '' })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result: any = ProductoSchema.safeParse(producto)

        if (!result.success) {
            setErroresForm({ [result.error?.issues[0].path[0]]: result.error?.issues[0].message })
            return
        }

        if (editando) {
            const { error, message, data } = await editarProductoAPI(producto.id_producto, producto)

            if (error) {
                setAlerta({ error, msg: message || message[0] })
                setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
                return
            }

            const producto_actual = productos.map((item: any) => item.id_producto === producto.id_producto ? data : item)

            setProductos(producto_actual)

        } else {
            const { error, message, data } = await guardarProductoAPI(producto)

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
                        <label className="text-sm">Referencia</label>
                        <input type="text" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.referencia ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: ABC123' value={producto.referencia} onChange={e => changeInput(e)} name="referencia" />
                        <small className='text-red-700 font-semibold'>{erroresForm.referencia}</small>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Nombre</label>
                        <input type="text" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.nombre ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: Tornillo' value={producto.nombre} onChange={e => changeInput(e)} name="nombre" />
                        <small className='text-red-700 font-semibold'>{erroresForm.nombre}</small>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Cantidad</label>
                        <input type="number" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.cantidad ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: 4' value={producto.cantidad} onChange={e => changeInput(e)} name="cantidad" />
                        <small className='text-red-700 font-semibold'>{erroresForm.cantidad}</small>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Unidad de Medida</label>
                        <select name="id_unidad" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.id_unidad ? 'border-red-700' : 'border-gray-200'}`} onChange={e => changeInput(e)} value={producto.id_unidad}>
                            <option value="">-- Seleccione --</option>
                            {unidadesMedida.map((item: any) => (
                                <option key={item.id_unidad} value={item.id_unidad}>{item.nombre}</option>
                            ))}
                        </select>
                        <small className='text-red-700 font-semibold'>{erroresForm.id_unidad}</small>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-full p-2">
                        <label className="text-sm">Precio Costo</label>
                        <input type="number" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.precio_costo ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: 123456' value={producto.precio_costo} onChange={e => changeInput(e)} name="precio_costo" />
                        <small className='text-red-700 font-semibold'>{erroresForm.precio_costo}</small>
                    </div>
                    <div className="w-full p-2">
                        <label className="text-sm">Precio Venta</label>
                        <input type="number" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.precio_venta ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: 12345678' value={producto.precio_venta} onChange={e => changeInput(e)} name="precio_venta" />
                        <small className='text-red-700 font-semibold'>{erroresForm.precio_venta}</small>
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