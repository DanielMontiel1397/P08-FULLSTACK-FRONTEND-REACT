import type z from "zod";
import type { tokenUrlSchema } from "../schemas/ConfirmarCuentaSchema";

export type TokenUrlType = z.infer<typeof tokenUrlSchema>

export type ConfirmarEmailAdministradorErrorType = {
    ok: false,
    estado: string,
    msg: string
}

export type ConfirmarEmailAdministradorSuccessType = {
    ok: true,
    estado: string,
    msg: string
}

export type ConfirmarEmailAdministradorType = ConfirmarEmailAdministradorErrorType | ConfirmarEmailAdministradorSuccessType