import type { StateCreator } from "zustand";
import type { ClientesResumenType, ClientesSucursalType, ClientesType, ClienteFormType } from "../types/clienteTypes/ClienteType";
import { crearClienteSucursal, editarClienteSucursal, obtenerClientesPorSucursal, obtenerClientesSucursal, obtenerTodosLosClientes } from "../services/clienteServices";
import { toast } from "react-toastify";
import type { PaginacionClientesType } from "../types/PaginacionType";

export type ClienteSliceType = {
    clientes: ClientesType;
    clientesResumen: ClientesResumenType,
    clientesSucursal: ClientesSucursalType,
    paginacionClientes: PaginacionClientesType
    obtenerClientes: (sucursalId: number, page: number, limit: number) => Promise<void>;
    obtenerTodosLosClientes: (page: number, limit: number) => Promise<void>;
    obtenerClientesSucursal: (page: number, limit: number) => Promise<void>
    crearCliente: (dataCliente: ClienteFormType) => Promise<void>;
    editarCliente: (idCliente: string, dataCliente: Partial<ClienteFormType>) => Promise<void>
}

const clientesResumenInicial = {
    clientesActivos: 0,
    clientesInactivos: 0,
    totalClientes: 0
}

const clientesSucursalInicial = {
    id: 0,
    name: ''
}

const paginacionSucursalesInicial : PaginacionClientesType = {
    pagina: 1,
    limite: 10,
    totalPaginas: 1,
    totalClientes: 3
}

export const clienteSlice : StateCreator<ClienteSliceType> = (set) => ({
    clientes: [],

    clientesResumen: clientesResumenInicial,

    clientesSucursal: clientesSucursalInicial,

    paginacionClientes: paginacionSucursalesInicial,

    obtenerClientes: async (sucursalid, page, limit) => {
        const respuesta = await obtenerClientesPorSucursal(sucursalid, page, limit);
        
        if(respuesta.ok){
            set({
                clientes: respuesta.data.clientes,
                clientesResumen: respuesta.data.clientesResumen,
                clientesSucursal: respuesta.data.sucursal,
                paginacionClientes: respuesta.data.paginacion
            })
        } else {
            toast.error(respuesta.msg)
            set({
                clientes:[],
                clientesResumen: clientesResumenInicial,
                clientesSucursal: clientesSucursalInicial,
                paginacionClientes: paginacionSucursalesInicial
            })
        }

    },
    
    obtenerTodosLosClientes: async (page, limit) => {
        const respuesta = await obtenerTodosLosClientes(page, limit);
        
        if(respuesta.ok){
            set({
                clientes: respuesta.data.clientes,
                paginacionClientes: respuesta.data.paginacion
            })
        } else {
            toast.error(respuesta.msg)
            set({
                clientes:[],
                paginacionClientes: paginacionSucursalesInicial
            })
        }
    },

    obtenerClientesSucursal: async (page, limit) => {
        const respuesta = await obtenerClientesSucursal(page,limit);
        
        if(respuesta.ok){
            set({
                clientes: respuesta.data.clientes,
                paginacionClientes: respuesta.data.paginacion
            })
        } else {
            toast.error(respuesta.msg);
            set({
                clientes: [],
                paginacionClientes: paginacionSucursalesInicial
            })
        }
    },

    crearCliente: async (data) => {
        const respuesta = await crearClienteSucursal(data);
        
        if(respuesta.ok){
            toast.success(respuesta.msg)
        } else {
            toast.error(respuesta.msg)
        }
    },

    editarCliente: async (idCliente, data) => {
        const respuesta = await editarClienteSucursal(idCliente, data);
      
        if(respuesta.ok){
            toast.success(respuesta.msg);
        } else {
            toast.error(respuesta.msg);
        }
    }

})