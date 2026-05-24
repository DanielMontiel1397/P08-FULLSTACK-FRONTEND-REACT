import { create } from "zustand";
import { authSlice, type AuthSliceType } from "./authSlice";
import { devtools } from "zustand/middleware";
import { adminSlice, type AdminSliceType } from "./adminSlice";
import { clienteSlice, type ClienteSliceType } from "./clienteSlice";
import { sucursalSlice, type SucursalSliceType } from "./sucursalSlice";


export const useAppStore = create<AuthSliceType & AdminSliceType & ClienteSliceType & SucursalSliceType>()(devtools(
    ((...a)=> ({
        ...authSlice(...a),
        ...adminSlice(...a),
        ...clienteSlice(...a),
        ...sucursalSlice(...a)
    }))
))