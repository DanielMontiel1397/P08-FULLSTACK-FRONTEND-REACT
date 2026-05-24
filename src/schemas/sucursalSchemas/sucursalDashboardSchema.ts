import z from "zod";

export const sucursalResumenDashboardSchema = z.object({
    clientesTotales: z.number(),
    clientesActivos: z.number(),
    clientesInactivos: z.number(),
    tipo_membresia: z.object({
        semana: z.number(),
        mes: z.number(),
        year: z.number()
    })
})

export const sucursalDasboardSchema = z.object({
    data: z.object({
        resumen: sucursalResumenDashboardSchema
    })
    ,
    msg: z.string()
})

export const sucursalDashboardErrorSchema = z.object({
    msg: z.string()
})