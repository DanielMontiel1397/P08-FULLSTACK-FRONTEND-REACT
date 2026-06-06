import axios from "axios";
import clienteAxios from "../config/axios";
import { ADMIN_ENDPOINTS, SUCURSAL_ENDPOINTS } from "../config/endpoints";
import { crearClienteSchemaResponse, editarClienteSchemaResponse, editarMembresiaClienteSchemaResponse, eliminarClienteSchemaResponse, obtenerClientesSucursalAutenticadaSchemaResponse, obtenerClientesSucursalSchemaResponse, obtenerTodosClientesSchemaResponse } from "../schemas/clients/clientesSchema";
import type { ClienteFormType, CrearClienteResponseType, EditarClienteResponseType, EditarMembresiaClienteResponseType, EliminarClienteResponseType, ObtenerClientesSucursalAutenticadaResponseType, ObtenerClientesSucursalType, ObtenerClienteSucursalErrorType, ObtenerTodosLosClientesType } from "../types/clienteTypes/ClienteType";
import { schemaErrorResponse } from "../schemas/generalErrorsSchema";

const respuestaCatchConexion: ObtenerClienteSucursalErrorType = {
    ok: false,
    msg: 'Error de conexión, revisar su conexión a internet'
};

const respuestaErrorTypado: ObtenerClienteSucursalErrorType = {
    ok: false,
    msg: 'Hubo un error al procesar la información'
}

export async function obtenerClientesPorSucursal(sucursalId: number, page: number, limit: number): Promise<ObtenerClientesSucursalType> {
    const url = `${ADMIN_ENDPOINTS.OBTENER_CLIENTES_SUCURSAL}/${sucursalId}/clientes?page=${page}&limit=${limit}`;

    try {
        const { data } = await clienteAxios.get(url);

        const result = obtenerClientesSucursalSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                data: {
                    clientes: result.data.data.clientes,
                    clientesResumen: result.data.data.clientesResumen,
                    sucursal: result.data.data.sucursal,
                    paginacion: result.data.paginacion
                },
                msg: 'Clientes Obtenidos Correctamente'
            }
        }

        return respuestaErrorTypado;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {

            const result = schemaErrorResponse.safeParse(error.response.data);

            if (result.success) {
                return {
                    ok: false,
                    msg: result.data.msg
                }
            }

            return respuestaErrorTypado;

        }

        return respuestaCatchConexion;
    }
}

export async function obtenerTodosLosClientes(page: number, limit: number): Promise<ObtenerTodosLosClientesType> {
    const url = `${ADMIN_ENDPOINTS.OBTENER_TODOS_CLIENTES}?page=${page}&limit=${limit}`

    try {
        const { data } = await clienteAxios.get(url);

        const result = obtenerTodosClientesSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                data: {
                    clientes: result.data.data.clientes,
                    paginacion: result.data.paginacion
                },
                msg: 'Clientes obtenidos Correctamente'
            }
        }

        return respuestaErrorTypado;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {

            const result = schemaErrorResponse.safeParse(error.response.data);

            if (result.success) {
                return {
                    ok: false,
                    msg: result.data.msg
                }
            }

            return respuestaErrorTypado;

        }

        return respuestaCatchConexion;
    }
}

export async function obtenerClientesSucursal(page: number, limit: number): Promise<ObtenerClientesSucursalAutenticadaResponseType> {
    try {

        const { data } = await clienteAxios.get(`${SUCURSAL_ENDPOINTS.OBTENER_CLIENTES_SUCURSAL}?page=${page}&limit=${limit}`);

        const result = obtenerClientesSucursalAutenticadaSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                data: {
                    clientes: result.data.data.clientes,
                    paginacion: result.data.paginacion
                },
                msg: result.data.msg,
            }
        }

        return respuestaErrorTypado;

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const result = schemaErrorResponse.safeParse(error.response.data);

            if (result.success) {
                return {
                    ok: false,
                    msg: result.data.msg
                }
            }

            return respuestaErrorTypado;
        }

        return respuestaCatchConexion;
    }
}

export async function crearClienteSucursal(dataCliente: ClienteFormType): Promise<CrearClienteResponseType> {
    try {

        const { data } = await clienteAxios.post(SUCURSAL_ENDPOINTS.CREAR_CLIENTE, dataCliente);

        const result = crearClienteSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                msg: result.data.msg,
                data: result.data.data.cliente
            }
        }

        return respuestaErrorTypado;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const result = schemaErrorResponse.safeParse(error.response.data);

            if (result.success) {
                return {
                    ok: false,
                    msg: result.data.msg
                }
            }

            return respuestaErrorTypado;
        }

        return respuestaCatchConexion;
    }
}

export async function editarClienteSucursal(idCliente: string, dataCliente: Partial<ClienteFormType>): Promise<EditarClienteResponseType> {

    const url = `${SUCURSAL_ENDPOINTS.EDITAR_CLIENTE}/${idCliente}`;


    try {
        const { data } = await clienteAxios.patch(url, dataCliente);

        const result = editarClienteSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                msg: result.data.msg,
                data: result.data.data.cliente
            }
        }

        return respuestaErrorTypado;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const result = schemaErrorResponse.safeParse(error.response.data);

            if (result.success) {
                return {
                    ok: false,
                    msg: result.data.msg
                }
            }

            return respuestaErrorTypado;
        }

        return respuestaCatchConexion;
    }
}

export async function editarMembresiaCliente(idCliente: string, membresiaData: ClienteFormType['membership_type']) : Promise<EditarMembresiaClienteResponseType> {
    const url = `${SUCURSAL_ENDPOINTS.EDITAR_MEMBRESIA}/${idCliente}/membresia`;

    try {

        const {data} = await clienteAxios.patch(url,{membership_type: membresiaData});

        const result = editarMembresiaClienteSchemaResponse.safeParse(data);

        if(result.success){
            return {
                ok: true,
                data: result.data.data.cliente,
                msg: result.data.msg
            }
        }

        return respuestaErrorTypado;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const result = schemaErrorResponse.safeParse(error.response.data);

            if (result.success) {
                return {
                    ok: false,
                    msg: result.data.msg
                }
            }

            return respuestaErrorTypado;
        }

        return respuestaCatchConexion;
    }
}

export async function eliminarCliente(idCliente: string) : Promise<EliminarClienteResponseType>{
    const url = `${SUCURSAL_ENDPOINTS.ELIMINAR_CLIENTE}/${idCliente}`;

    try {
        const {data} = await clienteAxios.delete(url);

        const result = eliminarClienteSchemaResponse.safeParse(data);

        if(result.success){
            return {
                ok: true,
                msg: result.data.msg
            }
        }

        return respuestaErrorTypado;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const result = schemaErrorResponse.safeParse(error.response.data);

            if (result.success) {
                return {
                    ok: false,
                    msg: result.data.msg
                }
            }

            return respuestaErrorTypado;
        }

        return respuestaCatchConexion;
    }
}