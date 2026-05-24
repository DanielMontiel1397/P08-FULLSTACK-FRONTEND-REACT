import z from "zod";

export const sucursalPerfil = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    is_activated: z.coerce.boolean(),
    is_verified: z.coerce.boolean()
});

////SUCURSAL AUTENTICADA CORRECTAMENTE
export const verificarSucursalAutenticadaSchemaResponse = z.object({
  valid: z.coerce.boolean(),
  data: z.object({
    usuario: sucursalPerfil
  })  
});