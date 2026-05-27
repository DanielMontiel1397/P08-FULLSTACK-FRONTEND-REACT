import axios from "axios";
import clienteAxios from "../config/axios";
import { SUCURSAL_ENDPOINTS } from "../config/endpoints";
import { obtenerPerfilSucursalSchemaResponse, verificarSucursalAutenticadaSchemaResponse } from "../schemas/sucursalSchemas/sucursalPerfilSchema";

import { mensajeErrorSucursalSchemaResponse } from "../schemas/sucursalSchemas/sucursalGeneralSchema";
import type { ErrorTypadoGeneralType, MensajeConexionErrorSucursalType } from "../types/sucursalTypes/sucursalGeneralTypes";
import type { ObtenerPerfilSucursalResponseType, SucursalVerificadaResponseType } from "../types/sucursalTypes/sucursalPerfilTypes";
import { sucursalDasboardSchema, sucursalDashboardErrorSchema } from "../schemas/sucursalSchemas/sucursalDashboardSchema";
import type { DashboardSucursalResponseType } from "../types/sucursalTypes/sucursalDashboardTypes";


const respuestaCatchConexion: MensajeConexionErrorSucursalType = {
    ok: false,
    msg: 'Error de conexión, revisar su conexión a internet'
};

const respuestaErrorTypado: ErrorTypadoGeneralType = {
    ok: false,
    msg: 'Hubo un error al procesar la información'
}

export async function verificarSucursal() : Promise<SucursalVerificadaResponseType> {
    try {
        const {data} = await clienteAxios.get(SUCURSAL_ENDPOINTS.VERIFICAR);
        const result = verificarSucursalAutenticadaSchemaResponse.safeParse(data);

        if(result.success){
            return {
                ok: true,
                data: result.data.data.usuario,
                msg: 'Sucursal Verificada Correctamente'
            }
        }

        return respuestaErrorTypado;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            
            const result = mensajeErrorSucursalSchemaResponse.safeParse(error.response.data);

            if(result.success){
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

export async function obtenerDashboardSucursal() : Promise<DashboardSucursalResponseType> {
    
    try {
        
        const {data} = await clienteAxios.get(SUCURSAL_ENDPOINTS.INICIO);
        
        const result = sucursalDasboardSchema.safeParse(data);

        if(result.success){
            return {
                ok: true,
                msg: result.data.msg,
                data: result.data.data
            }
        }

        return respuestaErrorTypado;

    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            
            const result = sucursalDashboardErrorSchema.safeParse(error.response.data);

            if(result.success){
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

export async function obtenerPerfilSucursal() : Promise<ObtenerPerfilSucursalResponseType> {
    try {
        const {data} = await clienteAxios.get(SUCURSAL_ENDPOINTS.PERFIL);

        const result = obtenerPerfilSucursalSchemaResponse.safeParse(data);

        if(result.success){
            return {
                ok: true,
                msg: result.data.msg,
                data: result.data.data.sucursal
            }
        }

        return respuestaErrorTypado;

    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            
            const result = sucursalDashboardErrorSchema.safeParse(error.response.data);

            if(result.success){
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