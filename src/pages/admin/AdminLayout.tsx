import { Outlet, useNavigate, Navigate } from "react-router-dom";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import { useAppStore } from "../../stores/useAppStore";
import { useEffect, useState } from "react";


export default function AdminLayout() {

  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  const verificarAdministrador = useAppStore(state => state.verificarToken);
  const administradorAutenticado = useAppStore(state => state.authAdministrador)


  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN_ADMIN_GYM');

    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    verificarAdministrador()
  }, [verificarAdministrador, navigate])



  if (!administradorAutenticado) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar 
        open={open} 
        setOpen={setOpen} 
      />

      <main className={`flex-1 min-h-screen md:pt-0 ${open ? 'md:ml-0' : 'md:ml-0'}`}>
        <Outlet />
      </main>

    </div>
  )
}