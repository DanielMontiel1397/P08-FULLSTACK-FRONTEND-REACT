

////VERIFICAR SUCURSAL AUTENTICADA

import type z from "zod";
import type { inputsPerfilSucursalEditarSchema, sucursalPerfil, verificarSucursalAutenticadaSchemaResponse } from "../../schemas/sucursalSchemas/sucursalPerfilSchema";

export type SucuraslVerificadaResponseSuccessType = z.infer<typeof verificarSucursalAutenticadaSchemaResponse>;

export type SucursalPerfilType = z.infer<typeof sucursalPerfil>;

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


////TYPES OBTENER PERFIL

export type ObtenerPerfilSucursalSuccessType = {
    ok: true,
    msg: string,
    data: SucursalPerfilType
}

export type ObtenerPerfilSucursalErrorType = {
    ok: false,
    msg: string
}

export type ObtenerPerfilSucursalResponseType = ObtenerPerfilSucursalSuccessType | ObtenerPerfilSucursalErrorType;

/////TYPES PARA EDITAR PERFIL
export type PerfilSucursalFormDataType = z.infer<typeof inputsPerfilSucursalEditarSchema>;

export type EditarSucursalErrorType = {
    ok: false,
    msg: string
}

export type EditarSucursalSuccessType = {
    ok: true,
    msg: string,
    data: SucursalPerfilType
}

export type EditarSucursalIndividualResponseType = EditarSucursalSuccessType | EditarSucursalErrorType;