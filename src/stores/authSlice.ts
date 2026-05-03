import { type StateCreator } from "zustand";
import type { AdministradorResponseType, LoginType, SucursalResponseType } from "../types/auth.types";
import { autenticarSucursal, autenticarSuperAdmin, confirmarEmailAdministrador } from "../services/authServices";
import { toast } from "react-toastify";
import { verificarAdministrador } from "../services/adminServices";
import type { ConfirmarEmailAdministradorType, TokenUrlType } from "../types/ConfirmarCuentaType";

export type AuthSliceType = {
    authAdministrador: AdministradorResponseType,
    authSucursal: SucursalResponseType,
    loading: boolean,
    tokenAdministrador: string | null,
    tokenSucursal: string | null,
    error: string | null,
    loginSuperAdmin: (data: LoginType) => Promise<void>,
    loginSucursal: (credenciales: LoginType) => Promise<void>,
    verificarTokenAdministrador: () => Promise<void>
    confirmarEmailAdministrador: (token: TokenUrlType) => Promise<ConfirmarEmailAdministradorType>;
    logOutAdministrador: () => void;
}


const estadoInicialAuthAdministrador: AdministradorResponseType = null;

const estadoInicialAuthSucursal: SucursalResponseType = {
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    is_activated: false,
    is_verified: false
}

export const authSlice: StateCreator<AuthSliceType> = (set) => ({
    authAdministrador: estadoInicialAuthAdministrador,
    authSucursal: estadoInicialAuthSucursal,
    loading: false,
    tokenAdministrador: null,
    tokenSucursal: null,
    error: null,

    verificarTokenAdministrador: async () => {

        set({
            loading: true
        })

        const respuesta = await verificarAdministrador();

        if(respuesta.ok){
            set({
                authAdministrador: respuesta.data,
                loading: false
            })
        } else {
            set({
                authAdministrador: estadoInicialAuthAdministrador,
                tokenAdministrador: null,
                loading: false
            })
            localStorage.removeItem('AUTH_TOKEN_ADMIN_GYM');
        }
    },

    loginSuperAdmin: async (data) => {

        set({
            loading: true
        })

        const respuesta = await autenticarSuperAdmin(data);
        
        if (respuesta.success) {
            toast.success(respuesta.msg);
            set({
                authAdministrador: respuesta.data.data.usuario,
                tokenAdministrador: respuesta.data.data.token,
                error: null,
                loading: false
            })
            localStorage.setItem('AUTH_TOKEN_ADMIN_GYM', respuesta.data.data.token);
        } else {
            toast.error(respuesta.msg);
            set({
                authAdministrador: estadoInicialAuthAdministrador,
                tokenAdministrador: null,
                error: respuesta.msg,
                loading: false
            })
            localStorage.removeItem('AUTH_TOKEN_ADMIN_GYM')
        }

    },

    loginSucursal: async (credenciales) => {
        set({
            loading: true
        })

        const respuesta = await autenticarSucursal(credenciales);

        if (respuesta.success) {
            toast.success(respuesta.msg);
            set({
                authSucursal: respuesta.data.data.usuario,
                tokenSucursal: respuesta.data.data.token,
                error: null,
                loading: false
            })
            localStorage.setItem('AUTH_TOKEN_SUCURSAL_GYM', respuesta.data.data.token);
        } else {
            toast.error(respuesta.msg);
            set({
                authSucursal: estadoInicialAuthSucursal,
                tokenSucursal: null,
                error: respuesta.msg,
                loading: false
            })
            localStorage.removeItem('AUTH_TOKEN_SUCURSAL_GYM')
        }
    },

    confirmarEmailAdministrador: async (token)=> {
        set({
            loading: true
        })
        const respuesta = await confirmarEmailAdministrador(token)
        

        set({
            loading: false
        })

        return respuesta;
    },

    logOutAdministrador: () => {
        set({
            authAdministrador: estadoInicialAuthAdministrador,
            tokenAdministrador: null,
            error: null
        });
        toast.success('Sesión Cerrada');
        localStorage.removeItem('AUTH_TOKEN_ADMIN_GYM');
    }
})
