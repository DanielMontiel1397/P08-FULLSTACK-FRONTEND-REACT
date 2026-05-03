import type { StateCreator } from "zustand";
import type { DashboardType } from "../types/adminTypes/dashboardAdminType";
import { crearSucursalAdmin, editarPerfilAdmin, editarSucursalAdmin, obtenerDashboardAdmin, obtenerPerfilAdmin, obtenerSucursales } from "../services/adminServices";
import { toast } from "react-toastify";
import type { perfilAdminType } from "../types/adminTypes/perfilAdminType";
import type {  SucursalFormularioEditarType, SucursalFormularioType, SucursalType } from "../types/adminTypes/SucursalAdminType";
import type { PaginacionSucursalType } from "../types/PaginacionType";


export type AdminSliceType = {
    dashboard: DashboardType,
    perfilAdmin: perfilAdminType
    getDashboard: () => void;
    getPerfil: () => void,
    editarPerfil: (email: perfilAdminType['email']) => Promise<boolean>,
    obtenerSucursalesAdministrador: (page: number, limit: number) => void;
    sucursales: SucursalType[]
    paginacionSucursales: PaginacionSucursalType
    crearSucursal: (dataSucursal: SucursalFormularioType) => void;
    editarSucursal: (dataSucursal: SucursalFormularioEditarType) => void;

}

const perfilAdminInicial : perfilAdminType = {
    id: 0,
    email: '',
    createdAt: '',
    updatedAt: '',
    is_confirmed: false
}

const dashboardInicial: DashboardType = {
    data: {
        resumen: {
            totalSucursales: 0,
            totalClientes: 0,
            clientesActivos: 0,
            clientesInactivos: 0,
        },
        sucursales: []
    }
};

const paginacionSucursalesInicial : PaginacionSucursalType = {
    pagina: 1,
    limite: 10,
    totalPaginas: 1,
    totalSucursales: 3
}

export const adminSlice: StateCreator<AdminSliceType> = (set) => ({

    perfilAdmin: perfilAdminInicial,

    dashboard: dashboardInicial,

    sucursales: [],

    paginacionSucursales: paginacionSucursalesInicial,

    getDashboard: async () => {
        const respuesta = await obtenerDashboardAdmin();
        
        if(respuesta.ok){
            set({
                dashboard: respuesta.data
            })
        } else {
            toast.error(respuesta.msg)
        }

    },

    getPerfil: async () => {
        const respuesta = await obtenerPerfilAdmin();
        
        if(respuesta.ok){
            set({
                perfilAdmin: respuesta.data
            })
        } else {
            toast.error(respuesta.msg);
            set({
                perfilAdmin: perfilAdminInicial
            })
        }
    },

    editarPerfil: async (email) => {
        const respuesta = await editarPerfilAdmin(email);
        
        if(respuesta.ok){
            toast.success(respuesta.msg)
            return true
        } else {
            toast.error(respuesta.msg)
            return false
        }
    },

    obtenerSucursalesAdministrador: async (page, limit) => {
        const respuesta = await obtenerSucursales(page, limit);
        
        if(respuesta.ok){
            set({
                sucursales: respuesta.sucursales,
                paginacionSucursales: respuesta.paginacion
            })
        } else {
            set({
                sucursales: [],
                paginacionSucursales: paginacionSucursalesInicial
            });

            toast.error(respuesta.msg)
        }
    },

    crearSucursal: async (data) => {
        const respuesta = await crearSucursalAdmin(data);
        
        if(respuesta.ok){
            toast.success(respuesta.msg)
        } else {
            toast.error(respuesta.msg)
        }
    },
    
    editarSucursal: async (data) => {
        const respuesta = await editarSucursalAdmin(data);
        
        if(respuesta.ok){
            toast.success(respuesta.msg);
        } else {
            toast.error(respuesta.msg)
        }
    }
})