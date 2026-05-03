import { Outlet, useNavigate, Navigate } from "react-router-dom";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import { useAppStore } from "../../stores/useAppStore";
import { useEffect, useState } from "react";
import Cargando from "../../components/Cargando";

export default function AdminLayout() {

  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  //PROTEJER RUTAS
  const verificarAdministrador = useAppStore(state => state.verificarTokenAdministrador);
  const administradorAutenticado = useAppStore(state => state.authAdministrador)
  const loading = useAppStore(state => state.loading);

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN_ADMIN_GYM');

    if (!token) {
      navigate('/auth/loginAdmin', { replace: true });
      return;
    }

    verificarAdministrador()
  }, [])

  if (loading) {
    return (
      <Cargando message="Cargando..."/>
    )
  }

  if (!administradorAutenticado) {
    return <Navigate to="/auth/loginAdmin" replace />;
  }



  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar open={open} setOpen={setOpen} />

      <main
        className={`
          flex-1 min-h-screen
          transition-all duration-300
          ${open ? 'ml-64' : 'ml-20'}
        `}
      >
        <Outlet />
      </main>

    </div>
  )
}
