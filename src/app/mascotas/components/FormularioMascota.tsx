import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { MascotasSchema } from '../mascotas.zod'
import AuthContext from '../../auth/context/AuthProvider'
import Alerta from '../../../components/Alerta'
import MascotasContext from '../context/MascotasProvider'
import { editarMascotaAPI, guardarMascotaAPI } from '../api/mascotasCliente.api'
import ClientesContext from '../../clientes/context/ClientesProvider'

interface FormularioProps {
    handleClose: () => void
}

const FormularioMascota = ({ handleClose }: FormularioProps) => {
    const { alerta, setAlerta } = useContext(AuthContext)
    const { mascotas, setMascotas, mascota, setMascota, editando, obtenerEspecies, especies, obtenerRazas, razas } = useContext(MascotasContext)
    const { cliente } = useContext(ClientesContext)


    const [erroresForm, setErroresForm] = useState<{ [key: string]: string | number }>({
        id_raza: '',
        id_especie: '',
        nombre: '',
        edad: '',
        color: '',
    })


    useEffect(() => {
        obtenerEspecies()
    }, [])


    const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === 'id_especie') { obtenerRazas(value) }

        setMascota({
            ...mascota,
            [name]: ['id_raza', 'id_especie', 'edad'].includes(name) ? parseInt(value) : value
        })
        setErroresForm({ ...erroresForm, [name]: '' })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result: any = MascotasSchema.safeParse(mascota)

        if (!result.success) {
            setErroresForm({ ...erroresForm, [result.error?.issues[0].path[0]]: result.error?.issues[0].message })
            return
        }

        if (editando) {
            const { error, message, data } = await editarMascotaAPI(cliente.id_usuario, mascota.id_mascota, mascota)

            if (error) {
                setAlerta({ error, msg: message || message[0] })
                setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
                return
            }

            const mascota_actual = mascotas.map((emp: any) => emp.id_mascota === mascota.id_mascota ? data : emp)

            setMascotas(mascota_actual)

        } else {
            const { error, message, data } = await guardarMascotaAPI(cliente.id_usuario, mascota)

            if (error) {
                setAlerta({ error, msg: message || message[0] })
                setTimeout(() => setAlerta({ error: false, msg: '' }), 3000)
                return
            }

            setMascotas([data, ...mascotas])
        }

        Swal.fire({
            title: `Exitoso`,
            text: `¡Se ha ${editando ? 'editado' : 'agregado'} la mascota!`,
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
                        <label className="text-sm">Especies</label>
                        <select name="id_especie" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.id_especie ? 'border-red-700' : 'border-gray-200'}`} onChange={e => changeInput(e)} value={mascota.id_especie}>
                            <option value="">-- Seleccione --</option>
                            {especies.map((item: any) => (
                                <option key={item.id_especie} value={item.id_especie}>{item.nombre}</option>
                            ))}
                        </select>
                        <small className='text-red-700 font-semibold'>{erroresForm.id_especie}</small>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Razas</label>
                        <select name="id_raza" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.id_raza ? 'border-red-700' : 'border-gray-200'}`} onChange={e => changeInput(e)} value={mascota.id_raza}>
                            <option value="">-- Seleccione --</option>
                            {razas.map((item: any) => (
                                <option key={item.id_raza} value={item.id_raza}>{item.nombre}</option>
                            ))}
                        </select>
                        <small className='text-red-700 font-semibold'>{erroresForm.id_raza}</small>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Nombre</label>
                        <input type="text" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.nombre ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: Firulais' value={mascota.nombre} onChange={e => changeInput(e)} name="nombre" />
                        <small className='text-red-700 font-semibold'>{erroresForm.nombre}</small>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Edad Mes(es)</label>
                        <input type="number" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.edad ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: 3' value={mascota.edad} onChange={e => changeInput(e)} name="edad" />
                        <small className='text-red-700 font-semibold'>{erroresForm.edad}</small>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2 p-2">
                        <label className="text-sm">Color</label>
                        <input type="text" className={`w-full p-2 text-gray-700 bg-gray-100 rounded-lg ${erroresForm.color ? 'border-red-700' : 'border-gray-200'}`} placeholder='Ej: Gris y blanco' value={mascota.color} onChange={e => changeInput(e)} name="color" />
                        <small className='text-red-700 font-semibold'>{erroresForm.color}</small>
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

export default FormularioMascota