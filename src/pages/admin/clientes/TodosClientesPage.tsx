import { useEffect } from 'react';

import ClienteCard from '../../../components/ClienteCard';

import Paginacion from '../../../components/Paginacion';
import { useAppStore } from '../../../stores/useAppStore';
import { useSearchParams } from 'react-router-dom';
import Cargando from '../../../components/Cargando';

export default function TodosClientesPage() {

  ////OBTENER DATOS USESTORE/////
  const cargando = useAppStore(state => state.loadingAdmin)
  const obtenerTodosLosClientes = useAppStore(state => state.obtenerTodosLosClientes);
  const clientesTotal = useAppStore(state => state.clientes);
  const paginacion = useAppStore(state => state.paginacionClientes)

  ///OBTENER QUERYS DE URL
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '8')

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: newPage.toString(),
      limit: limit.toString()
    })
  };

  useEffect(() => {
    obtenerTodosLosClientes(page, limit);
  }, [page, limit, obtenerTodosLosClientes]);

  if(cargando){
    return <Cargando message='Cargando clientes...' />
  }


  return (
    <div className="w-full h-full overflow-auto bg-zinc-950 p-4 md:p-8 pt-20 md:pt-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">👥</span>
            <div>
              <h1 className="text-3xl font-bold text-zinc-100">
                Todos los Clientes
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Vista global de clientes de todas las sucursales
              </p>
            </div>
          </div>
        </div>

        {/* Grid de clientes */}
        {clientesTotal.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientesTotal.map((cliente) => (
                <ClienteCard
                  key={cliente.id}
                  cliente={cliente}
                  showSucursalBadge={true}
                />
              ))}
            </div>

            {/* Paginación */}
            <Paginacion
              paginaActual={paginacion.pagina}
              totalPaginas={paginacion.totalPaginas}
              totalRegistros={paginacion.totalClientes}
              registrosPorPagina={paginacion.limite}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="
            bg-zinc-900 
            border border-zinc-800 
            rounded-xl 
            p-12 
            text-center
          ">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-zinc-400 text-lg">
              No hay clientes registrados
            </p>
          </div>
        )}

      </div>
    </div>
  );
}