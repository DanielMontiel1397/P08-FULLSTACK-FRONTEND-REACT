import axios from "axios";
import clienteAxios from "../config/axios";
import { ADMIN_ENDPOINTS} from "../config/endpoints";
import { dashboardSchemaResponse } from "../schemas/adminSchemas/adminDashboardSchema";
import type { DashboardErrorType, DashboardResponseType } from "../types/adminTypes/dashboardAdminType";
import { schemaErrorResponse } from "../schemas/generalErrorsSchema";
import { perfilAdminEdicionSchemaResponse, perfilAdminSchemaResponse, verificarAdministradorSchemaResponse } from "../schemas/adminSchemas/adminPerfilSchema";
import type { perfilAdminEdicionResponse, perfilAdminResponse, perfilAdminType, VerificarAdministradorResponseType } from "../types/adminTypes/perfilAdminType";
import { sucursalCrearSuccessSchemaResponse, sucursalEditarSuccessSchemaResponse, sucursalesAdministradorSchemaResponse } from "../schemas/adminSchemas/adminSucursalesSchema";
import type { CrearSucursalResponseType, EditarSucursalResponseType, ObtenerSucursalesResponseType, SucursalFormularioEditarType, SucursalFormularioType } from "../types/adminTypes/SucursalAdminType";

const respuestaCatchConexion: DashboardErrorType = {
    ok: false,
    msg: 'Error de conexión, revisar su conexión a internet'
};

const respuestaErrorTypado: DashboardErrorType = {
    ok: false,
    msg: 'Hubo un error al procesar la información'
}

export async function verificarAdministrador(): Promise<VerificarAdministradorResponseType> {
    try {
        const { data } = await clienteAxios.get(ADMIN_ENDPOINTS.VERIFICAR);
        const result = verificarAdministradorSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                data: result.data.data.usuario,
                msg: 'Administrador verificado correctamente'
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

export async function obtenerDashboardAdmin(): Promise<DashboardResponseType> {

    try {

        const { data } = await clienteAxios.get(ADMIN_ENDPOINTS.INICIO);

        const result = dashboardSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                msg: 'Dashboard obtenido Correctamente',
                data: result.data
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

export async function obtenerPerfilAdmin(): Promise<perfilAdminResponse> {

    try {

        const { data } = await clienteAxios.get(ADMIN_ENDPOINTS.PERFIL);

        const result = perfilAdminSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                msg: result.data.msg,
                data: result.data.data.administrador
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

export async function editarPerfilAdmin(email: perfilAdminType['email']): Promise<perfilAdminEdicionResponse> {

    try {

        const { data } = await clienteAxios.put(ADMIN_ENDPOINTS.EDITAR_PERFIL, { email });

        const result = perfilAdminEdicionSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
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

export async function obtenerSucursales(page: number, limit: number): Promise<ObtenerSucursalesResponseType> {
    try {
        const { data } = await clienteAxios.get(`${ADMIN_ENDPOINTS.OBTENER_SUCURSALES}?page=${page}&limit=${limit}`);
        const result = sucursalesAdministradorSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                sucursales: result.data.data,
                paginacion: result.data.paginacion,
                msg: 'Sucursales obtenidas Correctamente'
            }
        }

        return respuestaErrorTypado
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

export async function crearSucursalAdmin(dataSucursal: SucursalFormularioType): Promise<CrearSucursalResponseType> {
    try {
        const { data } = await clienteAxios.post(ADMIN_ENDPOINTS.CREAR_SUCURSAL, dataSucursal);

        const result = sucursalCrearSuccessSchemaResponse.safeParse(data);

        if (result.success) {
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

export async function editarSucursalAdmin(dataSucursal: SucursalFormularioEditarType) : Promise<EditarSucursalResponseType>{

    const {id , ...rest} = dataSucursal;

    const idSucursal :number = id;
    const dataEditarSucursal: Omit<SucursalFormularioEditarType, 'id'> =rest;

    const url = `${ADMIN_ENDPOINTS.EDITAR_SUCURSAL}/${idSucursal}`

    try {
        
        const {data} = await clienteAxios.put(url,dataEditarSucursal );

        const result = sucursalEditarSuccessSchemaResponse.safeParse(data);

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