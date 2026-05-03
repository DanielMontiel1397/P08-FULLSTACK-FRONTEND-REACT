import z from "zod";
import { paginacionSucursalesSchema } from "../paginacionSchema";

export const sucursalAdministradorSchema = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    is_activated: z.coerce.boolean(),
    is_verified: z.coerce.boolean()
})

export const sucursalesAdministradorSchemaResponse = z.object({
    data: z.array(sucursalAdministradorSchema),
    paginacion: paginacionSucursalesSchema
})

//SCHEMA CREAR SUCURSAL

//Schema formulario sucursal
export const sucursalFormularioSchema = z.object({
    name: z
        .string()
        .min(1, 'El nombre es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z
        .string()
        .min(1, 'El email es obligatorio')
        .email('Ingresa un email válido'),
    address: z
        .string()
        .min(1, 'La dirección es obligatoria')
        .min(5, 'La dirección debe tener al menos 5 caracteres'),
    phone: z
        .string()
        .min(1, 'El teléfono es obligatorio')
        .min(10, 'El teléfono debe tener al menos 10 dígitos')
        .max(15, 'El teléfono no debe exceder 15 dígitos')
        .regex(/^[0-9]+$/, 'El teléfono solo debe contener números')
})

//Schema respuesta crear sucursal

export const sucursalCrearSuccessSchemaResponse = z.object({
    msg: z.string()
})

///SCHEMA EDITAR SUCURSAL
export const sucursalEditarSuccessSchemaResponse = z.object({
    msg: z.string()
})