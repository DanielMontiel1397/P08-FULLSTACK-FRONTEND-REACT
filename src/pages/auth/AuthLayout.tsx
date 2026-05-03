import { Outlet, useNavigate } from "react-router-dom";
import AuthSidebar from "../../components/AuthSidebar";
import { useAppStore } from "../../stores/useAppStore";
import { useEffect } from "react";
import Cargando from "../../components/Cargando";

export default function AuthLayout() {

  const navigate = useNavigate()

  ///VERIFICAR RUTA
  const verificarAdministrador = useAppStore(state => state.verificarTokenAdministrador);
  const administradorAutenticado = useAppStore(state => state.authAdministrador)
  const cargando = useAppStore(state => state.loading);

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN_ADMIN_GYM');

    if (token) {
      verificarAdministrador()
    }
  }, [])

  //Mostrar cargando mientras se verifica usuario
  if (cargando) {
    return (
      <Cargando message="Cargando..." />
    )
  }


  if (administradorAutenticado) {
    navigate('/admin');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">

      <AuthSidebar />

      <main className="flex-1 flex items-center justify-center">
        <Outlet />
      </main>

    </div>
  )
}
