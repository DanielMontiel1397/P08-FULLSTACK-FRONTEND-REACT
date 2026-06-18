import { useEffect } from "react";
import { useAppStore } from "../../stores/useAppStore"
import DashboardCard from "../../components/DashboardCard";

export default function DashboardSucursalPage() {

  const dashboardSucursal = useAppStore(state => state.getDashboardSucursal);
  const sucursalAutenticado = useAppStore(state => state.authSucursal)
  const data = useAppStore(state => state.sucursalDashboard);
  const perfilSucursal = useAppStore(state => state.authSucursal)

  useEffect(() =>{
    if(!sucursalAutenticado) return;
    dashboardSucursal();
  }, [sucursalAutenticado,dashboardSucursal])

  const porcentajeActivos = data.resumen.clientesTotales > 0 ? (data.resumen.clientesActivos / data.resumen.clientesTotales) * 100 : 0
  const porcentajeInactivos = data.resumen.clientesTotales > 0 ? (data.resumen.clientesInactivos / data.resumen.clientesTotales) * 100 : 0


  return (
      <div className="w-full h-full overflow-auto bg-zinc-950 p-4 md:p-8 pt-20 md:pt-10">
  
        {/* 📌 Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100">
            Dashboard {perfilSucursal?.name}
          </h1>
          <p className="text-zinc-400 mt-2">
            Vista general de los Clientes
          </p>
        </div>
  
        {/* 📊 SECCIÓN: ESTADÍSTICAS GENERALES */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">
            Estadísticas Generales
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  
            <DashboardCard
              titulo="Total Clientes"
              valor={data.resumen.clientesTotales}
              porcentaje={100} 
              color="blue"
              icon="👥"
            />

            <DashboardCard
              titulo="Clientes Activos"
              valor={data.resumen.clientesActivos}
              porcentaje={porcentajeActivos}
              color="green"
              icon="✅"
            />
  
            <DashboardCard
              titulo="Clientes Inactivos"
              valor={data.resumen.clientesInactivos}
              porcentaje={porcentajeInactivos}
              color="red"
              icon="❌"
            />
          </div>
        </div>
  
 
      </div>
    );
}
