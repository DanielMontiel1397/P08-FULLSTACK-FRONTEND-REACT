export const AUTH_ENDPOINTS = {
    LOGIN_ADMIN: '/auth/superadmin/login',
    LOGIN_SUCURSAL: '/auth/sucursal/login',
    FORGOT_PASSWORD_ADMIN: '/auth/superadmin/olvidar-password',
    FORGOT_PASSWORD_SUCURSAL: '/auth/sucursal/olvidar-password',
    VERIFY_TOKEN_ADMIN: '/auth/superadmin/verificar-token/', //Más token
    VERIFY_TOKEN_SUCURSAL: '/auth/sucursal/verificar-token/', //Más token
    RESET_PASSWORD_ADMIN: '/auth/superadmin/resetear-password/', //Más token
    RESET_PASSWORD_SUCURSAL: '/auth/sucursal/resetear-password/', //Más token
    CONFIRM_SUCURSAL: '/auth/sucursal/confirmar-cuenta/', //Más token
    CREATED_PASSWORD_SUCURSAL: '/auth/sucursal/crear-password/', //Más token
    ACTUALIZAR_PASSWORD_SUCURSAL: '/auth/sucursal/validar-nuevo-email/', //Más token
    CONFIRMAR_EMAIL_ADMINISTRADOR: '/superAdministrador/verificar-nuevo-email'
}

export const ADMIN_ENDPOINTS = {
    VERIFICAR: '/superAdministrador/verificar',
    INICIO: '/superAdministrador/inicio',
    PERFIL: '/superAdministrador/perfil',
    EDITAR_PERFIL: '/superAdministrador/perfil',
    OBTENER_SUCURSALES: '/superAdministrador/sucursales',
    CREAR_SUCURSAL: '/superAdministrador/crear-sucursal',
    OBTENER_CLIENTES_SUCURSAL: '/superAdministrador/sucursal',
    OBTENER_TODOS_CLIENTES: '/superAdministrador/clientes',
    EDITAR_SUCURSAL: '/superAdministrador/sucursales'
}