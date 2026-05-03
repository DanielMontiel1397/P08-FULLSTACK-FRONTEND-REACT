import { useEffect } from "react";
import DashboardCard from "../../components/DashboardCard"
import SucursalCard from "../../components/SucursalCard"
import { useAppStore } from "../../stores/useAppStore";

export default function DashboardAdminPage() {
  
  const dataDashboard = useAppStore(state => state.getDashboard)
  const administradorAutenticado = useAppStore(state => state.authAdministrador);
  const {data} = useAppStore(state => state.dashboard);

  useEffect(() => {
    if(!administradorAutenticado) return; 
    dataDashboard()
  }, [])

  const porcentajeActivos = data.resumen.totalClientes > 0 ? (data.resumen.clientesActivos / data.resumen.totalClientes) * 100 : 0
  const porcentajeInactivos = data.resumen.totalClientes > 0 ? (data.resumen.clientesInactivos / data.resumen.totalClientes) * 100 : 0

  return (
    <div className="w-full h-full overflow-auto bg-zinc-950 p-8">

      {/* 📌 Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">
          Dashboard SuperAdministrador
        </h1>
        <p className="text-zinc-400 mt-2">
          Vista general de todas las sucursales y clientes
        </p>
      </div>

      {/* 📊 SECCIÓN: ESTADÍSTICAS GENERALES */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-100 mb-4">
          Estadísticas Generales
        </h2>

        {/* Grid responsivo: 1 col en móvil, 2 en tablet, 4 en desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Card 1: Total Sucursales */}
          <DashboardCard
            titulo="Total Sucursales"
            valor={data.resumen.totalSucursales}
            porcentaje={100}  // Siempre 100% porque es el total
            color="blue"
            icon="🏢"
          />

          {/* Card 2: Total Clientes */}
          <DashboardCard
            titulo="Total Clientes"
            valor={data.resumen.totalClientes}
            porcentaje={100}  // Siempre 100% porque es el total
            color="blue"
            icon="👥"
          />

          {/* Card 3: Clientes Activos */}
          <DashboardCard
            titulo="Clientes Activos"
            valor={data.resumen.clientesActivos}
            porcentaje={porcentajeActivos}
            color="green"
            icon="✅"
          />

          {/* Card 4: Clientes Inactivos */}
          <DashboardCard
            titulo="Clientes Inactivos"
            valor={data.resumen.clientesInactivos}
            porcentaje={porcentajeInactivos}
            color="red"
            icon="❌"
          />
        </div>
      </div>

      {/* 🏢 SECCIÓN: LISTA DE SUCURSALES */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-zinc-100">
            Sucursales ({data.sucursales.length})
          </h2>

       
        </div>

        {/* Contenedor con scroll vertical */}
        <div className="
          space-y-4 
          max-h-600px
          overflow-y-auto
          pr-2
        ">
          {/* Mapear todas las sucursales */}
          {data.sucursales.map((sucursal) => (
            <SucursalCard
              key={sucursal.idSucursal}
              id={sucursal.idSucursal}
              name={sucursal.nameSucursal}
              clientes={sucursal.clientes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
