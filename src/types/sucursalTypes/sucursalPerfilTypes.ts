

////VERIFICAR SUCURSAL AUTENTICADA

import type z from "zod";
import type { sucursalPerfil, verificarSucursalAutenticadaSchemaResponse } from "../../schemas/sucursalSchemas/sucursalPerfilSchema";

export type SucuraslVerificadaResponseSuccessType = z.infer<typeof verificarSucursalAutenticadaSchemaResponse>;

export type SucursalPerfilType = z.infer<typeof sucursalPerfil> | null;

export type SucursalVerificadaSuccessType = {
    ok: true,
    msg:string,
    data: SucursalPerfilType
}

export type SucursalVerificadaErrorType = {
    ok: false,
    msg: string
}

export type SucursalVerificadaResponseType = SucursalVerificadaSuccessType | SucursalVerificadaErrorType;