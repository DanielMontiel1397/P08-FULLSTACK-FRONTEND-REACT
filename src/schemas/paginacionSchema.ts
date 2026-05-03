import z from "zod";

export const paginacionSucursalesSchema = z.object({
    pagina: z.number(),
    limite: z.number(),
    totalPaginas: z.number(),
    totalSucursales: z.number()
})

export const paginacionClientesSchema = paginacionSucursalesSchema.omit({totalSucursales: true}).extend({totalClientes: z.number()})