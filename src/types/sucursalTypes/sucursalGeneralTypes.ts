import type z from "zod";
import { mensajeErrorSucursalSchemaResponse } from "../../schemas/sucursalSchemas/sucursalGeneralSchema";

export type MensajeGeneralErrorSucursalType = z.infer<typeof mensajeErrorSucursalSchemaResponse>;

export type MensajeConexionErrorSucursalType = {
    ok: false,
    msg: string
};

export type ErrorTypadoGeneralType = {
    ok: false,
    msg: string
};
