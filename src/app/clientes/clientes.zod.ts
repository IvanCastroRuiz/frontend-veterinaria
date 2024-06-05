import z from 'zod'

export const ClientesSchema = z.object({
    id_tipo_doc: z.number({
        invalid_type_error: 'Tipo de documento no válido',
        required_error: 'Seleccione un tipo de documento',
    }).min(1, {
        message: 'Seleccione un tipo de documento',
    }),
    cedula: z.string({
        required_error: 'Ingrese el cedula del empleado',
        invalid_type_error: 'Cedula no válida',
    }).nonempty({
        message: 'Ingrese el cedula del empleado',
    }),
    nombres: z.string({
        required_error: 'Ingrese el nombre del empleado',
        invalid_type_error: 'Nombre no válido',
    }).nonempty({
        message: 'Ingrese el nombre del empleado',
    }),
    apellidos: z.string({
        required_error: 'Ingrese el apellido del empleado',
        invalid_type_error: 'Apellido no válido',
    }).nonempty({
        message: 'Ingrese el apellido del empleado',
    }),
    correo: z.string({
        required_error: 'Ingrese el correo del empleado',
        invalid_type_error: 'Correo no válido',
    }).email({
        message: 'Correo no válido',
    }).nonempty({
        message: 'Ingrese el correo del empleado',
    }),
    telefono: z.string({
        required_error: 'Ingrese el telefono del empleado',
        invalid_type_error: 'Telefono no válido',
    }).nonempty({
        message: 'Ingrese el telefono del empleado',
    }),
    direccion: z.string({
        required_error: 'Ingrese la dirección del empleado',
        invalid_type_error: 'Dirección no válida',
    }).nonempty({
        message: 'Ingrese la dirección del empleado',
    }),
    contrasena: z.string({
        required_error: 'Ingrese la contraseña del empleado',
        invalid_type_error: 'Contraseña no válida',
    }).nonempty({
        message: 'Ingrese la contraseña del empleado',
    }).optional(),
    confirmarContrasena: z.string({
        required_error: 'Confirme la contraseña del empleado',
        invalid_type_error: 'Contraseña no válida',
    }).nonempty({
        message: 'Ingrese la contraseña del empleado',
    }).optional(),
})