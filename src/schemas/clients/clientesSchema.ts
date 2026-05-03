import z from "zod";
import { paginacionClientesSchema } from "../paginacionSchema";

/////VER CLIENTES DE SUCURSAL///

export const sucursalClienteSchema = z.object({
    id: z.number(),
    name: z.string()
})

export const clienteSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.number(),
    phone: z.string(),
    membership_type: z.enum(['semana', 'mes', 'anualidad']),
    membership_end: z.string(),
    membership_start: z.string(),
    is_activated: z.coerce.boolean()
})

export const clientesSchema = z.array(clienteSchema);

export const clientesResumenSchema = z.object({
    clientesActivos: z.number(),
    clientesInactivos: z.number(),
    totalClientes: z.number()
})

export const obtenerClientesSucursalSchemaResponse = z.object({
    data: z.object({
        sucursal: sucursalClienteSchema,
        clientesResumen: clientesResumenSchema,
        clientes: clientesSchema
    }),
    paginacion: paginacionClientesSchema
})

//////VER TODOS LOS CLIENTES//////
export const obtenerTodosClientesSchemaResponse = z.object({
    data: z.object({
        clientes: z.array(clienteSchema.extend({sucursal: sucursalClienteSchema})),
        clientesResumen: clientesResumenSchema
    }),
    paginacion: paginacionClientesSchema
})

///////CREAR CLIENTE/////
export const clienteFormSchema = z.object({
    name: z
        .string()
        .min(1, 'El nombre es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    phone: z
        .string()
        .min(1, 'El teléfono es obligatorio')
        .min(10, 'El teléfono debe tener al menos 10 dígitos')
        .max(15, 'El teléfono no debe exceder 15 dígitos')
        .regex(/^[0-9]+$/, 'El teléfono solo debe contener números'),
    age: z
        .string()
        .min(1, 'La edad es obligatoria')
        .regex(/^[0-9]+$/, 'La edad debe ser un número')
        .refine((val) => parseInt(val) >= 10 && parseInt(val) <= 120, {
            message: 'La edad debe estar entre 10 y 120 años'
        }),
    membership_type: z.enum(['semana', 'mes', 'anualidad'])
        .refine(Boolean, {
            message: 'Selecciona un tipo de membresía'
        })
});