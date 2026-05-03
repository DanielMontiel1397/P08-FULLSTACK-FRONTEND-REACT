import type z from "zod";
import type { dashboardSchemaResponse } from "../../schemas/adminSchemas/adminDashboardSchema";
import type { schemaErrorResponse } from "../../schemas/generalErrorsSchema";

export type DashboardType = z.infer<typeof dashboardSchemaResponse>

export type DashboardErrorResponseType = z.infer<typeof schemaErrorResponse>

export type DashboardSuccessType = {
    ok: true,
    msg: string,
    data: DashboardType
}

export type DashboardErrorType = {
    ok: false,
    msg: string
}

export type DashboardResponseType = DashboardSuccessType | DashboardErrorType;