import z from 'zod'

export const ProductoSchema = z.object({
    referencia: z.string({
        required_error: 'Ingrese la referencia del producto',
        invalid_type_error: 'Referencia no válida',
    }).nonempty({
        message: 'Ingrese la referencia del producto',
    }),
    nombre: z.string({
        required_error: 'Ingrese el nombre del producto',
        invalid_type_error: 'Nombre no válido',
    }).nonempty({
        message: 'Ingrese el nombre del producto',
    }),
    cantidad: z.number({
        required_error: 'Ingrese la cantidad del producto',
        invalid_type_error: 'Cantidad no válida',
    }).min(1, {
        message: 'Ingrese la cantidad del producto',        
    }),
    id_unidad: z.number({
        required_error: 'Seleccione la unidad del producto',
        invalid_type_error: 'Unidad no válida',
    }).min(1, {
        message: 'Seleccione la unidad del producto',
    }),
    precio_costo: z.number({
        required_error: 'Ingrese el precio del producto',
        invalid_type_error: 'Precio no válido',
    }).min(1, {
        message: 'Ingrese el precio del producto',
    }),
    precio_venta: z.number({        
        required_error: 'Ingrese el precio del producto',
        invalid_type_error: 'Precio no válido',
    }).min(1, {
        message: 'Ingrese el precio del producto',
    }),
})