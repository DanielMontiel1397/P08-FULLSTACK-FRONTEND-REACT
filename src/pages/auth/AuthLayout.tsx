import { Outlet } from "react-router-dom";
import AuthSidebar from "../../components/AuthSidebar";
import { useAppStore } from "../../stores/useAppStore";
import Cargando from "../../components/Cargando";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";

export default function AuthLayout() {

  const cargando = useAppStore(state => state.loading);

  useAuthRedirect();

  //Mostrar cargando mientras se verifica usuario
  if (cargando) {
    return (
      <Cargando message="Cargando..." />
    )
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
