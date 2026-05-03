import z from "zod";

export const perfilAdminSchema = z.object({
    id: z.number(),
    email: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    is_confirmed: z.coerce.boolean()
})

export const perfilAdminSchemaResponse = z.object({
    data: z.object({
        administrador: perfilAdminSchema
    }),
    msg: z.string()
})

//EDICION DE PERFIL
export const perfilAdminEdicionSchemaResponse = z.object({
    msg: z.string()
})


////VERIFICACION TOKEN SUPER ADMIN
export const verificarAdministradorSchemaResponse = z.object({
    valid: z.coerce.boolean(),
    data: z.object({
        usuario: perfilAdminSchema
    })
})