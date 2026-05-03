import type z from "zod"
import type { perfilAdminSchema } from "../../schemas/adminSchemas/adminPerfilSchema"

export type perfilAdminType = z.infer<typeof perfilAdminSchema>

export type perfilAdminErrorResponse = {
    ok: false,
    msg: string
}

export type perfilAdminSuccessResponse = {
    ok: true,
    msg: string
    data: perfilAdminType
}

export type perfilAdminEdicionSuccessResponse = {
    ok: true,
    msg: string
}

export type perfilAdminResponse = perfilAdminSuccessResponse | perfilAdminErrorResponse;

export type perfilAdminEdicionResponse = perfilAdminEdicionSuccessResponse | perfilAdminErrorResponse;

////TYPES VERIFICAR SUPER ADMINISTRADOR
export type verificarAdministradorSuccessResponse = {
    ok: true,
    msg: string,
    data: perfilAdminType
}

export type VerificarAdministradorResponseType = verificarAdministradorSuccessResponse | perfilAdminErrorResponse;