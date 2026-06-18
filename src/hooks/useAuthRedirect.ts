import { useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { useEffect } from "react";

export function useAuthRedirect(redirectToHome: boolean = false) {
    const navigate = useNavigate();

    const verificarAutenticado = useAppStore(state => state.verificarToken);
    const administradorAutenticado = useAppStore(state => state.authAdministrador);
    const usuarioActivo = useAppStore(state => state.activeUserType);
    const sucursalAutenticada = useAppStore(state => state.authSucursal);

    useEffect(() => {
        const userType = localStorage.getItem('GYM_USER_TYPE');
        const tokenAdmin = localStorage.getItem('AUTH_TOKEN_ADMIN_GYM');
        const tokenSucursal = localStorage.getItem('AUTH_TOKEN_SUCURSAL_GYM');

        if((userType === 'admin' && tokenAdmin) || (userType === 'sucursal' && tokenSucursal)){
            verificarAutenticado();
        }
    }, [verificarAutenticado]);

    useEffect(() => {
        if(administradorAutenticado && usuarioActivo === 'admin'){
            navigate(redirectToHome ? '/admin' : '/admin', {replace: true})
        } else if(sucursalAutenticada && usuarioActivo === 'sucursal'){
            navigate(redirectToHome ? '/sucursal' : '/sucursal', {replace: true});
        } 
    }, [administradorAutenticado, sucursalAutenticada, usuarioActivo, navigate])
}