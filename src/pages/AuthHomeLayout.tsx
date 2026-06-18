import { Outlet } from "react-router-dom";
import AuthSidebar from "../components/AuthSidebar";
import { useAppStore } from "../stores/useAppStore";
import Cargando from "../components/Cargando";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function AuthHomeLayout() {
  const cargando = useAppStore(state => state.loading);
  
  useAuthRedirect(true);

  if (cargando) {
    return <Cargando message="Cargando..." />;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AuthSidebar />
      
      <main className="
        flex-1 
        flex items-center justify-center 
        py-5 bg-zinc-950
        pt-20 md:pt-5
        px-5 md:px-0
      ">
        <Outlet />
      </main>
    </div>
  );
}