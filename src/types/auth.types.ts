import { administradorSchemaResponse, formErrorValidacionSchemaResponse, loginErrorSchemaResponse, loginSchema, loginSuccessSuperAdminSchemaResponse, loginSuccesSucursalSchemaResponse, sucursalSchemaResponse } from "../schemas/authSchema";
import {z} from "zod";

export type AdministradorResponseType = z.infer<typeof administradorSchemaResponse> | null;

export type SucursalResponseType = z.infer<typeof sucursalSchemaResponse>;

export type LoginType = z.infer<typeof loginSchema>;

export type LoginSuccessAdministradorResponseType = z.infer<typeof loginSuccessSuperAdminSchemaResponse>;

export type LoginErrorResponseType = z.infer<typeof loginErrorSchemaResponse>;

export type FormErrorValidacionResponseType = z.infer<typeof formErrorValidacionSchemaResponse>;

//TYPES LOGIN SUPER ADMIN SERVICE
export type LoginSuperAdminSuccessType = {
    success: true,
    data: LoginSuccessAdministradorResponseType,
    msg: string
}

export type LoginSuperAdminErrorType = {
    success: false,
    msg: string
}

export type LoginSuperAdminResponseType = LoginSuperAdminSuccessType | LoginSuperAdminErrorType;


//TYPES LOGIN SUCURSAL SERVICE
export type LoginSuccessSucursalResonseType = z.infer<typeof loginSuccesSucursalSchemaResponse>;

export type LoginSucursalSuccesType = {
    success: true,
    data: LoginSuccessSucursalResonseType,
    msg: string
}

export type LoginSucursalErrorType = {
    success: false,
    msg: string
}

export type LoginSucursalResponseType = LoginSucursalSuccesType | LoginSucursalErrorType;