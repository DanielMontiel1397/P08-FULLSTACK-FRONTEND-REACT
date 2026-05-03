import z from "zod";
import {  sucursalAdministradorSchema, sucursalCrearSuccessSchemaResponse, sucursalEditarSuccessSchemaResponse, sucursalFormularioSchema } from "../../schemas/adminSchemas/adminSucursalesSchema";
import type { PaginacionSucursalType } from "../PaginacionType";

export type SucursalType = z.infer<typeof sucursalAdministradorSchema>;


export type ObtenerSucursalesErrorType = {
    ok: false,
    msg: string
}

export type ObtenerSucursalesSuccessType = {
    ok: true,
    sucursales: SucursalType[],
    paginacion: PaginacionSucursalType,
    msg: string
}

export type ObtenerSucursalesResponseType = ObtenerSucursalesErrorType | ObtenerSucursalesSuccessType;


//TYPES PARA CREAR SUCURSAL
export type SucursalFormularioType = z.infer<typeof sucursalFormularioSchema>

export type CrearSucursalType = z.infer<typeof sucursalCrearSuccessSchemaResponse>

export type CrearSucursalErrorType = {
    ok: false,
    msg: string
}

export type CrearSucursalSuccessType = {
    ok: true,
    msg: string
}

export type CrearSucursalResponseType = CrearSucursalErrorType | CrearSucursalSuccessType

//TYPES PARA EDITAR SUCURSAL
export type SucursalFormularioEditarType = SucursalFormularioType & {
    id: number;
};

export type EditarSucursalType = z.infer<typeof sucursalEditarSuccessSchemaResponse>;

export type EditarSucursalSuccessType = {
    ok: true,
    msg: string
}

export type EditarSucursalErrorType = {
    ok: false, 
    msg: string
}

export type EditarSucursalResponseType = EditarSucursalSuccessType | EditarSucursalErrorType;