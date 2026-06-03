import { Outlet, useNavigate } from "react-router-dom";
import AuthSidebar from "../../components/AuthSidebar";
import { useAppStore } from "../../stores/useAppStore";
import { useEffect } from "react";
import Cargando from "../../components/Cargando";

export default function AuthLayout() {

  const navigate = useNavigate()

  ///VERIFICAR RUTA
  const verificarAutenticado = useAppStore(state => state.verificarToken);
  const administradorAutenticado = useAppStore(state => state.authAdministrador)
  const usuarioActivo = useAppStore(state => state.activeUserType)
  const sucursalAutenticada = useAppStore(state => state.authSucursal);

  const cargando = useAppStore(state => state.loading);

  useEffect(() => {
    const userType = localStorage.getItem('GYM_USER_TYPE');
    const tokenAdmin = localStorage.getItem('AUTH_TOKEN_ADMIN_GYM');
    const tokenSucursal = localStorage.getItem('AUTH_TOKEN_SUCURSAL_GYM');

    if ((userType === 'admin' && tokenAdmin) || (userType === 'sucursal' && tokenSucursal)) {
      verificarAutenticado()
    } else {
      navigate('/', {replace: true})
    }
  }, [verificarAutenticado])

  //Mostrar cargando mientras se verifica usuario
  if (cargando) {
    return (
      <Cargando message="Cargando..." />
    )
  }

  if (administradorAutenticado && usuarioActivo === 'admin') {
    navigate('/admin', {replace: true});
    return null;
  }

  if(sucursalAutenticada && usuarioActivo === 'sucursal'){
    navigate('/sucursal', {replace: true});
    return null
  }

  return (
    <div className="flex bg-gray-100 min-h-screen ">

      <AuthSidebar />

      <main className="flex-1 flex items-center justify-center py-5 bg-zinc-950">
        <Outlet />
      </main>

    </div>
  )
}
