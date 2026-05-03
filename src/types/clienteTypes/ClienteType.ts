import type z from "zod";
import type { clienteFormSchema, clienteSchema, clientesResumenSchema, clientesSchema, sucursalClienteSchema } from "../../schemas/clients/clientesSchema";
import type { PaginacionClientesType } from "../PaginacionType";

export type ClienteType = z.infer<typeof clienteSchema>
export type ClientesType = z.infer<typeof clientesSchema>
export type ClientesResumenType = z.infer<typeof clientesResumenSchema>
export type ClientesSucursalType = z.infer<typeof sucursalClienteSchema>

/////OBTENER CLIENTES POR SUCURSAL////

export type ObtenerClienteSucursalErrorType = {
    ok: false,
    msg: string
}

export type ObtenerClienteSucursalSuccessType = {
    ok: true,
    data: {
        clientes: ClientesType,
        clientesResumen: ClientesResumenType,
        sucursal: ClientesSucursalType,
        paginacion: PaginacionClientesType
    },
    msg: string
}

export type ObtenerClientesSucursalType = ObtenerClienteSucursalSuccessType | ObtenerClienteSucursalErrorType;

//////OBTENER TODOS LOS CLIENTES/////
export type ObtenerTodosLosClientesErrorType = {
    ok: false,
    msg: string
}

export type ObtenerTodosLosClientesSuccessType = {
    ok: true,
    data: {
        clientes: ClientesType
        paginacion: PaginacionClientesType
    },
    msg: string
}

export type ObtenerTodosLosClientesType = ObtenerTodosLosClientesErrorType | ObtenerTodosLosClientesSuccessType;

///////CREAR CLIENTES////
export type CrearClienteFormType = z.infer<typeof clienteFormSchema>
