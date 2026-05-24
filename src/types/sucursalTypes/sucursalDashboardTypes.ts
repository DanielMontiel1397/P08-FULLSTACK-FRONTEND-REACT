import z from "zod";
import { sucursalDasboardSchema } from "../../schemas/sucursalSchemas/sucursalDashboardSchema";


export type DashboardSucursalType = z.infer<typeof sucursalDasboardSchema>

export type DashboardSucursalSuccessType = {
    ok: true,
    msg: string,
    data: DashboardSucursalType['data']
}

export type DashboardSucursalErrorType = {
    ok: false,
    msg: string
}

export type DashboardSucursalResponseType = DashboardSucursalSuccessType | DashboardSucursalErrorType;