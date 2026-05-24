import type { StateCreator } from "zustand";
import type { DashboardSucursalType } from "../types/sucursalTypes/sucursalDashboardTypes";
import { obtenerDashboardSucursal } from "../services/sucursalServices";
import { toast } from "react-toastify";

export type SucursalSliceType = {
    sucursalDashboard: DashboardSucursalType['data'],
    getDashboardSucursal: () => void;
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

export const sucursalSlice: StateCreator<SucursalSliceType> = (set) => ({

    sucursalDashboard: dashboardSucursalInicial,

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
    }
})