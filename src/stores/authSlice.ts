import { type StateCreator } from "zustand";
import type { AdministradorResponseType, LoginType } from "../types/auth.types";
import { autenticarSucursal, autenticarSuperAdmin, confirmarEmailAdministrador, crearPasswordSucursal } from "../services/authServices";
import { toast } from "react-toastify";
import { verificarAdministrador } from "../services/adminServices";
import type { ConfirmarEmailAdministradorType, TokenUrlType } from "../types/ConfirmarCuentaType";
import { verificarSucursal } from "../services/sucursalServices";
import type { SucursalPerfilType } from "../types/sucursalTypes/sucursalPerfilTypes";

export type AuthSliceType = {
    authAdministrador: AdministradorResponseType,
    authSucursal: SucursalPerfilType,
    activeUserType: 'admin' | 'sucursal' | null,
    loading: boolean,
    tokenAdministrador: string | null,
    tokenSucursal: string | null,
    error: string | null,
    loginSuperAdmin: (data: LoginType) => Promise<void>,
    loginSucursal: (credenciales: LoginType) => Promise<void>,
    verificarToken: () => Promise<void>,
    confirmarEmailAdministrador: (token: TokenUrlType) => Promise<ConfirmarEmailAdministradorType>;
    crearPasswordSucursal: (password: string, token: string | null) => Promise<boolean>
    logOutAdministrador: () => void;
    logOutSucursal: () => void;
}


const estadoInicialAuthAdministrador: AdministradorResponseType = null;

const estadoInicialAuthSucursal: SucursalPerfilType = {
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    is_activated: false,
    is_verified: false
};

export const authSlice: StateCreator<AuthSliceType> = (set) => ({
    authAdministrador: estadoInicialAuthAdministrador,
    authSucursal: estadoInicialAuthSucursal,
    activeUserType: null,
    loading: false,
    tokenAdministrador: null,
    tokenSucursal: null,
    error: null,

    verificarToken: async () => {

        set({
            loading: true
        })

        const userType = localStorage.getItem('GYM_USER_TYPE');
        
        /////SI EL USUARIO LOGUEADO ES ADMIN VERIFICAMOS TOKEN ADMINISTRADOR
        if (userType === 'admin') {

            const respuesta = await verificarAdministrador();
           
            if (respuesta.ok) {
                set({
                    authAdministrador: respuesta.data,
                    activeUserType: 'admin',
                    loading: false
                })
            } else {
                set({
                    authAdministrador: estadoInicialAuthAdministrador,
                    tokenAdministrador: null,
                    activeUserType: null,
                    loading: false
                })
                localStorage.removeItem('AUTH_TOKEN_ADMIN_GYM');
            }
        } else if (userType === 'sucursal'){
            const respuesta =await verificarSucursal();
           
            if(respuesta.ok){
                set({
                    authSucursal: respuesta.data,
                    activeUserType: 'sucursal',
                    loading: false
                })
            } else {
                set({
                    authSucursal: estadoInicialAuthSucursal,
                    tokenSucursal: null,
                    activeUserType: null,
                    loading: false
                })
                localStorage.removeItem('AUTH_TOKEN_SUCURSAL_GYM')
            }
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
                activeUserType: 'admin',
                error: null,
                loading: false
            })
            localStorage.setItem('AUTH_TOKEN_ADMIN_GYM', respuesta.data.data.token);
            localStorage.setItem('GYM_USER_TYPE', 'admin');
        } else {
            toast.error(respuesta.msg);
            set({
                authAdministrador: estadoInicialAuthAdministrador,
                activeUserType: null,
                tokenAdministrador: null,
                error: respuesta.msg,
                loading: false
            })
            localStorage.removeItem('AUTH_TOKEN_ADMIN_GYM');
            localStorage.removeItem('GYM_USER_TYPE');
        }

    },

    loginSucursal: async (credenciales) => {

        set({
            loading: true
        })

        const respuesta = await autenticarSucursal(credenciales);
        console.log(respuesta);
        if (respuesta.success) {
            toast.success(respuesta.msg);
            set({
                authSucursal: respuesta.data.data.usuario,
                tokenSucursal: respuesta.data.data.token,
                activeUserType: 'sucursal',
                error: null,
                loading: false
            })
            localStorage.setItem('AUTH_TOKEN_SUCURSAL_GYM', respuesta.data.data.token);
            localStorage.setItem('GYM_USER_TYPE', 'sucursal');

        } else {
            
            toast.error(respuesta.msg);
            set({
                authSucursal: estadoInicialAuthSucursal,
                activeUserType: null,
                tokenSucursal: null,
                error: respuesta.msg,
                loading: false
            })
            localStorage.removeItem('AUTH_TOKEN_SUCURSAL_GYM');
            localStorage.removeItem('GYM_USER_TYPE');
        }
    },

    confirmarEmailAdministrador: async (token) => {
        set({
            loading: true
        })
        const respuesta = await confirmarEmailAdministrador(token)


        set({
            loading: false
        })

        return respuesta;
    },

    crearPasswordSucursal: async (password, token) => {

        set({
            loading: true
        })
        const respuesta = await crearPasswordSucursal(password, token);

        if (respuesta.success) {
            toast.success(respuesta.msg);
        } else {
            toast.error(respuesta.msg);
        }

        set({
            loading: false
        })

        return respuesta.success;
    },

    logOutAdministrador: () => {
        set({
            authAdministrador: estadoInicialAuthAdministrador,
            activeUserType: null,
            tokenAdministrador: null,
            error: null
        });
        toast.success('Sesión Cerrada');
        localStorage.removeItem('AUTH_TOKEN_ADMIN_GYM');
        localStorage.removeItem('GYM_USER_TYPE');
    },

    logOutSucursal: () => {
        set({
            authSucursal: estadoInicialAuthSucursal,
            activeUserType: null,
            tokenSucursal: null,
            error: null
        })
        toast.success('Sesión Cerrada');
        localStorage.removeItem('AUTH_TOKEN_SUCURSAL_GYM');
        localStorage.removeItem('GYM_USER_TYPE');
    }
})
