
import axios from "axios";
import clienteAxios from "../config/axios";
import { AUTH_ENDPOINTS } from "../config/endpoints";
import { crearPasswordSucursalSchemaResponse, formErrorValidacionSchemaResponse, loginErrorSchemaResponse, loginSuccessSuperAdminSchemaResponse, loginSuccesSucursalSchemaResponse } from "../schemas/authSchema";
import type { CrearPasswordSucursalType, LoginSucursalResponseType, LoginSuperAdminResponseType, LoginType } from "../types/auth.types";
import type { ConfirmarEmailAdministradorType, TokenUrlType } from "../types/ConfirmarCuentaType";
import { confirmarEmailAdministradorSchema } from "../schemas/ConfirmarCuentaSchema";
import type { DashboardErrorType } from "../types/adminTypes/dashboardAdminType";

const respuestaCatchConexion: DashboardErrorType = {
    ok: false,
    msg: 'Error de conexión, revisar su conexión a internet'
};

const respuestaErrorTypado: DashboardErrorType = {
    ok: false,
    msg: 'Hubo un error al procesar la información'
}

export async function autenticarSuperAdmin(credenciales: LoginType): Promise<LoginSuperAdminResponseType> {

    try {
        
        const { data } = await clienteAxios.post(AUTH_ENDPOINTS.LOGIN_ADMIN, credenciales);
        
        const result = loginSuccessSuperAdminSchemaResponse.safeParse(data);
        if (result.success) {
            return {
                success: true,
                data: result.data,
                msg: result.data.msg
            }
        }

        return {
            success: false,
            msg: 'Hubo un error al validar los datos'
        }

    } catch (error) {
       
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;

            const result = loginErrorSchemaResponse.safeParse(data);

            if (result.success) {
                return {
                    success: false,
                    msg: result.data.msg
                }
            }

            const resultValidationResult = formErrorValidacionSchemaResponse.safeParse(data);

            if(resultValidationResult.success){
                return {
                    success: false,
                    msg: 'Por favor verifica los datos ingresados'
                }
            }

            return {
                success: false,
                msg: 'Hubo un error al validar los datos'
            }
        }

        return {
            success: false,
            msg: 'Error de conexión, verifique su conexión a internet'
        }
    }

}

export async function autenticarSucursal(credenciales: LoginType) : Promise<LoginSucursalResponseType>{

    try {
        
        const {data} = await clienteAxios.post(AUTH_ENDPOINTS.LOGIN_SUCURSAL, credenciales);

        const result = loginSuccesSucursalSchemaResponse.safeParse(data);
        
        if(result.success){
            return {
                success: true,
                data: result.data,
                msg: result.data.msg
            }
        }

        return {
            success: false,
            msg: 'Hubo un error al validar los datos'
        }

    } catch (error) {
        
        if(axios.isAxiosError(error) && error.response){
            const {data} = error.response;

            const result = loginErrorSchemaResponse.safeParse(data);

            if(result.success){
                return {
                    success: false,
                    msg: result.data.msg
                }
            }

            const resultValidationResult = formErrorValidacionSchemaResponse.safeParse(data);
            if(resultValidationResult.success){
                return {
                    success: false,
                    msg: 'Por favor verifica los datos ingresados'
                }
            }

            return {
                success: false,
                msg: 'Hubo un error al validar los datos'
            }
        }

        return {
            success: false,
            msg: 'Error de conexión, verifique su conexión a internet'
        }
    }

}

export async function confirmarEmailAdministrador(token: TokenUrlType): Promise<ConfirmarEmailAdministradorType> {
    const url = `${AUTH_ENDPOINTS.CONFIRMAR_EMAIL_ADMINISTRADOR}/${token}`;

    try {
        const {data} = await clienteAxios.get(url);
        
        const result = confirmarEmailAdministradorSchema.safeParse(data);
        console.log(result);
        if(result.success){
            return {
                ok: true,
                estado: 'success',
                msg: result.data.msg
            }
        }
        return {...respuestaErrorTypado, estado: 'error'}
    } catch (error) {
         if(axios.isAxiosError(error) && error.response){
            const {data} = error.response;

            const result = loginErrorSchemaResponse.safeParse(data);

            if(result.success){
                return {
                    ok: false,
                    estado: 'error',
                    msg: result.data.msg
                }
            }

            const resultValidationResult = formErrorValidacionSchemaResponse.safeParse(data);
            if(resultValidationResult.success){
                return {
                    ok: false,
                    estado: 'error',
                    msg: 'Por favor verifica los datos ingresados'
                }
            }

            return {
                ok: false,
                estado: 'error',
                msg: 'Hubo un error al validar los datos'
            }
        }

        return {...respuestaCatchConexion, estado: 'error'}
    }
}

export async function crearPasswordSucursal(password: string, token: string | null) : Promise<CrearPasswordSucursalType>{
    
    try {
        console.log(password);
        const {data} = await clienteAxios.post(`${AUTH_ENDPOINTS.CREATED_PASSWORD_SUCURSAL}/${token}`, {password});

        const result = crearPasswordSucursalSchemaResponse.safeParse(data);

        if(result.success){
            return {
                success: true,
                msg: result.data.msg
            }
        }

        return {
            success: false,
            msg: 'Hubo un error al validar los datos'
        }
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            const {data} = error.response;
            
            const result = crearPasswordSucursalSchemaResponse.safeParse(data);

            if(result.success){
                return {
                    success: false,
                    msg: result.data.msg
                }
            }

            return {
                success: false,
                msg: 'Hubo un error al validar los datos'
            }
        }

        return {
            success: false,
            msg: 'Error de conexión, verifique su conexión a internet'
        }
    }

}