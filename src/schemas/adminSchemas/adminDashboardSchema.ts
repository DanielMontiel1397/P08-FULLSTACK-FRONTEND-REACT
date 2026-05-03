import z from "zod";

export const sucursalDashboardScheam = z.object({
    idSucursal: z.number(),
    nameSucursal: z.string(),
    clientes: z.object({
        total: z.number(),
        activos: z.number(),
        inactivos: z.number()
    })
})

export const resumenDashboardSchema = z.object({
    totalSucursales: z.number(),
    totalClientes: z.number(),
    clientesActivos: z.number(),
    clientesInactivos: z.number()
})

export const dashboardSchemaResponse = z.object({
    data: z.object({
        resumen: resumenDashboardSchema,
        sucursales: z.array(sucursalDashboardScheam)
    })
})

