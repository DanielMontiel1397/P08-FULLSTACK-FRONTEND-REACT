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

/////OBTENER PERFIL
export const obtenerPerfilSucursalSchemaResponse = z.object({
  data: z.object({
    sucursal: sucursalPerfil
  }),
  msg: z.string()
})

////EDITAR PERFIL

export const inputsPerfilSucursalEditarSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Ingresa un email válido'),
  phone: z
    .string()
    .min(1, 'El teléfono es obligatorio')
    .min(10, 'El teléfono debe tener al menos 10 caracteres'),
  address: z
    .string()
    .min(1, 'La dirección es obligatoria')
    .min(5, 'La dirección debe tener al menos 5 caracteres')
});

export const editarPerfilSucursalSchemaResponse = z.object({
  data: z.object({
    sucursal: sucursalPerfil
  }),
  msg: z.string()
})

export const editarPerfilSucursalErrorSchemaResponse = z.object({
  msg: z.string()
})