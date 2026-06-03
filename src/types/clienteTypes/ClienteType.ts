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

////OBTENER CLIENTES SUCURSAL AUTENTICADA

export type ObtenerClientesSucursalAutenticadaErrorType = {
    ok: false,
    msg: string
}

export type ObtenerClientesSucursalAutenticadaSuccessType = {
    ok: true,
    data: {
        clientes: ClientesType,
        paginacion: PaginacionClientesType
    }
    msg: string
};

export type ObtenerClientesSucursalAutenticadaResponseType = ObtenerClientesSucursalAutenticadaSuccessType | ObtenerClientesSucursalAutenticadaErrorType;

///////CREAR CLIENTES////
export type ClienteFormType = z.infer<typeof clienteFormSchema>

export type CrearClienteErrorType = {
    ok: false,
    msg: string
}

export type CrearClienteSuccessType = {
    ok: true,
    msg: string,
    data: ClienteType
};

export type CrearClienteResponseType = CrearClienteSuccessType | CrearClienteErrorType;

///EDITAR CLIENTES
export type ClienteTypeEditar = ClienteType & {id: string};

export type EditarClienteErrorType = {
    ok: false,
    msg: string
}

export type EditarClienteSuccessType = {
    ok: true,
    msg: string,
    data: ClienteType
};

export type EditarClienteResponseType = EditarClienteSuccessType | EditarClienteErrorType;