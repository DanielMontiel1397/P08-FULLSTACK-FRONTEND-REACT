import { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import ClienteCard from '../../../components/ClienteCard';
import DashboardCard from '../../../components/DashboardCard';
import { useAppStore } from '../../../stores/useAppStore';
import Paginacion from '../../../components/Paginacion';
import Cargando from '../../../components/Cargando';


export default function ClientesSucursalPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /////OBTENER STORE 
  const cargando = useAppStore(state => state.loadingAdmin);
  const obtenerClientes = useAppStore(state => state.obtenerClientes);
  const clientes = useAppStore(state => state.clientes);
  const clientesResumen = useAppStore(state => state.clientesResumen)
  const clientesSucursal = useAppStore(state => state.clientesSucursal)
  const paginacion = useAppStore(state => state.paginacionClientes)

  ///OBTENER QUERYS DE URL
  const [searchParams, setSearchParams] = useSearchParams();

  const idSucursal = parseInt(searchParams.get('idSucursal') || '1')
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '8')


  useEffect(() => {
    obtenerClientes(idSucursal, page, limit);
  }, [page, limit, obtenerClientes, idSucursal])

  if(cargando){
    return <Cargando message='Obteniendo clientes...' />
  }

  // 🔄 Calcular porcentajes
  const porcentajeActivos = clientesResumen.totalClientes > 0 ? (clientesResumen.clientesActivos / clientesResumen.totalClientes) * 100 : 0;
  const porcentajeInactivos = clientesResumen.totalClientes > 0 ? (clientesResumen.clientesInactivos / clientesResumen.totalClientes) * 100 : 0;

  //Paginacion
  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: newPage.toString(),
      limit: limit.toString()
    })
  };

  // ← Volver a detalle de sucursal
  const handleVolver = () => {
    navigate(`/admin/sucursales/${id}`);
  };

  // Si no existe la sucursal, redirigir
  if (!idSucursal) {
    navigate('/admin/sucursales');
    return null;
  }

  return (
    <div className="w-full h-full overflow-auto bg-zinc-950 p-4 md:p-8 pt-20 md:pt-10">

      {/* 📌 Header */}
      <div className="mb-8">
        <button
          onClick={handleVolver}
          className="
            flex items-center gap-2
            text-sm text-zinc-400
            hover:text-zinc-300
            transition-colors
            mb-4
            hover:cursor-pointer
          "
        >
          ← Volver a Detalle de Sucursal
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">
              Clientes de {clientesSucursal.name}
            </h1>
            <p className="text-zinc-400 mt-2">
              Gestiona los clientes de esta sucursal (Los Clientes solo pueden ser agregados o editados en la cuenta de la sucursal que los creo)
            </p>
          </div>

        </div>
      </div>

      {/* 📊 Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard
          titulo="Total Clientes"
          valor={clientesResumen.totalClientes}
          porcentaje={100}
          color="blue"
          icon="👥"
        />
        <DashboardCard
          titulo="Clientes Activos"
          valor={clientesResumen.clientesActivos}
          porcentaje={porcentajeActivos}
          color="green"
          icon="✅"
        />
        <DashboardCard
          titulo="Clientes Inactivos"
          valor={clientesResumen.clientesInactivos}
          porcentaje={porcentajeInactivos}
          color="red"
          icon="❌"
        />
      </div>

      {/* 📊 Grid de Clientes */}
      {clientes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente) => (
            <ClienteCard
              key={cliente.id}
              cliente={cliente}

            />
          ))}
        </div>
      ) : (
        <div className="
          bg-zinc-900 
          border border-zinc-800 
          rounded-xl 
          p-12 
          text-center
        ">
          <p className="text-zinc-400 text-lg">
            No hay clientes registrados en esta sucursal
          </p>

        </div>
      )}

      <Paginacion
        paginaActual={paginacion.pagina}
        totalPaginas={paginacion.totalPaginas}
        totalRegistros={paginacion.totalClientes}
        registrosPorPagina={paginacion.limite}
        onPageChange={handlePageChange}
      />

    </div>
  );
}