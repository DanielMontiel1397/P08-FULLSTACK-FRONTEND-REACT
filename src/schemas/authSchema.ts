import { z } from "zod";

//SCHEMAS DE USUARIO, ADMINISTRADOR, SUCURSAL Y CLIENTE

////SUPER ADMIN//////
export const administradorSchemaResponse = z.object({
    id: z.number(),
    email: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const sucursalSchemaResponse = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    is_activated: z.boolean(),
    is_verified: z.boolean()
})

//////SCHEMA LOGIN DESDE FRONTEND/////
export const loginSchema = z.object({
    email: z.email('Email inválido').min(1, "El email es obligatorio").trim(),
    password: z.string().min(1, 'Password requerido').min(6, "El password debe tener al menos 6 caracteres")
})

//SCHEMA RESPUESTA LOGIN API

//////SUPER ADMIN SCHEMAS/////
export const loginSuccessSuperAdminSchemaResponse = z.object({
    data: z.object({
        token: z.string(),
        usuario: administradorSchemaResponse
    }),
    msg: z.string()
})

export const loginErrorSchemaResponse = z.object({
    msg: z.string()
})

//Schema Error de Validación en Backend
export const formErrorValidacion = z.object({
    path: z.string(),
    msg: z.string()
})

export const formErrorValidacionSchemaResponse = z.object({
    errors: z.array(formErrorValidacion)
})

export const loginSuccesSucursalSchemaResponse = z.object({
    data: z.object({
        token: z.string(),
        usuario: sucursalSchemaResponse 
    }),
    msg: z.string()
});




