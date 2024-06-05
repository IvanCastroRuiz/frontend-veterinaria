import z from 'zod'

export const MascotasSchema = z.object({
    id_especie: z.number({
        invalid_type_error: 'Especie no válida',
        required_error: 'Seleccione una especie para la mascota',
    }).min(1, {
        message: 'Seleccione una especie',
    }),
    id_raza: z.number({
        invalid_type_error: 'Raza no válido',
        required_error: 'Seleccione una raza para la mascota',
    }).min(1, {
        message: 'Seleccione una raza',
    }),
    nombre: z.string({
        invalid_type_error: 'Nombre no válido',
        required_error: 'Ingrese el nombre de la mascota',
    }).nonempty({
        message: 'Ingrese el nombre de la mascota',
    }),
    edad: z.number({
        invalid_type_error: 'Edad no válida',
        required_error: 'Ingrese la edad de la mascota',
    }).min(1, {
        message: 'Ingrese la edad de la mascota',
    }),
    color: z.string({
        invalid_type_error: 'Color no válido',
        required_error: 'Ingrese el color de la mascota',
    }).nonempty({
        message: 'Ingrese el color de la mascota',
    }),
})