import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import { useEffect, useState } from "react";
import Cargando from "../../components/Cargando";
import SucursalSidebar from "../../components/sucursalComponents/SucursalSidebar";

export default function AdminLayout() {

  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  //PROTEJER RUTAS
  const verificarSucursal = useAppStore(state => state.verificarToken);
  const sucursalAutenticada = useAppStore(state => state.authSucursal)
  const loading = useAppStore(state => state.loading);

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN_SUCURSAL_GYM');

    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    verificarSucursal()
  }, [verificarSucursal, navigate])

  if (loading) {
    return (
      <Cargando message="Cargando..." />
    )
  }

  if (!sucursalAutenticada) {
    return <Navigate to="/auth/loginAdmin" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SucursalSidebar open={open} setOpen={setOpen} />

      <main className={`flex-1 min-h-screen md:pt-0 ${open ? 'md:ml-0' : 'md:ml-0'}`}>
        <Outlet />

      </main>

    </div>
  )
}
