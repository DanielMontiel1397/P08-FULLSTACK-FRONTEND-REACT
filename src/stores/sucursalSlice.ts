import type { StateCreator } from "zustand";
import type { DashboardSucursalType } from "../types/sucursalTypes/sucursalDashboardTypes";
import { obtenerDashboardSucursal, obtenerPerfilSucursal } from "../services/sucursalServices";
import { toast } from "react-toastify";
import type { SucursalPerfilType } from "../types/sucursalTypes/sucursalPerfilTypes";

export type SucursalSliceType = {
    sucursalDashboard: DashboardSucursalType['data'],
    getDashboardSucursal: () => void;
    getPerfilSucursal: () => void;
    perfilSucursal: SucursalPerfilType
}

const dashboardSucursalInicial: DashboardSucursalType['data'] = {
    resumen: {
        clientesTotales: 0,
        clientesActivos: 0,
        clientesInactivos: 0,
        tipo_membresia: {
            semana: 0,
            mes: 0,
            year: 0
        }
    }
}

const perfilSucursalInicial : SucursalPerfilType = {
     id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    is_activated: false,
    is_verified: false,
}

export const sucursalSlice: StateCreator<SucursalSliceType> = (set) => ({

    sucursalDashboard: dashboardSucursalInicial,

    perfilSucursal: perfilSucursalInicial,

    getDashboardSucursal: async () => {
        const respuesta = await obtenerDashboardSucursal();
        
        if(respuesta.ok){
            set({
                sucursalDashboard: respuesta.data
            })
        } else {
            toast.error(respuesta.msg);
            set({
                sucursalDashboard: dashboardSucursalInicial
            })
        }
    },

    getPerfilSucursal: async () => {
        const respuesta = await obtenerPerfilSucursal();
        
        if(respuesta.ok){
            set({
                perfilSucursal: respuesta.data
            })
        } else {
            toast.error(respuesta.msg);
            set({
                perfilSucursal: perfilSucursalInicial
            })
        }
    }
})