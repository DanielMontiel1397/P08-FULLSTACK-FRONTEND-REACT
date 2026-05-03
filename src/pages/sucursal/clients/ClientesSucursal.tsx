import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import ClienteCard from '../../../components/ClienteCard';
import ClienteFormModal from '../../../components/ClienteFormModal';
import RenovarMembresiaModal from '../../../components/RenovarMembresiaModal';
import ConfirmModal from '../../../components/ConfirmModal';
import DashboardCard from '../../../components/DashboardCard';
import { useAppStore } from '../../../stores/useAppStore';
import Paginacion from '../../../components/Paginacion';
import type { ClienteType } from '../../../types/clienteTypes/ClienteType';

export default function ClientesSucursalPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /////OBTENER STORE 

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
  }, [page, limit])

  // 🎛️ Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteType | null>(null);

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

  // ✏️ Handler: Editar cliente
  const handleEdit = (clienteId: number) => {
    const cliente = clientes.find(c => c.id === clienteId);
    if (cliente) {
      setClienteSeleccionado(cliente);
      setShowEditModal(true);
    }
  };

  // 🗑️ Handler: Eliminar cliente
  const handleDelete = (clienteId: number) => {
    const cliente = clientes.find(c => c.id === clienteId);
    if (cliente) {
      setClienteSeleccionado(cliente);
      setShowDeleteModal(true);
    }
  };

  // 🔄 Handler: Renovar membresía
  const handleRenew = (clienteId: number) => {
    const cliente = clientes.find(c => c.id === clienteId);
    if (cliente) {
      setClienteSeleccionado(cliente);
      setShowRenewModal(true);
    }
  };

  // ✅ Handler: Confirmar eliminación
  const handleConfirmDelete = () => {
    console.log('Eliminar cliente:', clienteSeleccionado?.id);
    // TODO: Llamar al backend
    setClienteSeleccionado(null);
  };

  // ✅ Handler: Confirmar renovación
  const handleConfirmRenew = (membershipType: 'semana' | 'mes' | 'anualidad') => {
    console.log('Renovar membresía:', clienteSeleccionado?.id, 'Tipo:', membershipType);
    // TODO: Llamar al backend
    setClienteSeleccionado(null);
  };

  // 💾 Handler: Crear cliente
  const handleCreateSubmit = (data: any) => {
    console.log('Crear cliente:', data);
    // TODO: Llamar al backend
  };

  // 💾 Handler: Guardar edición
  const handleEditSubmit = (data: any) => {
    console.log('Editar cliente:', clienteSeleccionado?.id, data);
    // TODO: Llamar al backend
    setClienteSeleccionado(null);
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
    <div className="w-full h-full overflow-auto bg-zinc-950 p-8">

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
              Gestiona los clientes de esta sucursal
            </p>
          </div>

          {/* Botón Crear */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="
              flex items-center gap-2
              px-4 py-2.5
              text-sm font-medium
              text-white
              bg-blue-600
              hover:bg-blue-700
              rounded-lg
              transition-colors
            "
          >
            <span className="text-lg">+</span>
            Nuevo Cliente
          </button>
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
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRenew={handleRenew}
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
          <button
            onClick={() => setShowCreateModal(true)}
            className="
              mt-4
              px-4 py-2
              text-sm font-medium
              text-blue-400
              hover:text-blue-300
              transition-colors
            "
          >
            Crear primer cliente
          </button>
        </div>
      )}

      <Paginacion
        paginaActual={paginacion.pagina}
        totalPaginas={paginacion.totalPaginas}
        totalRegistros={paginacion.totalClientes}
        registrosPorPagina={paginacion.limite}
        onPageChange={handlePageChange}
      />

      {/* Modal: Crear Cliente */}
      <ClienteFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateSubmit}
        mode="create"
      />

      {/* Modal: Editar Cliente */}
      <ClienteFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setClienteSeleccionado(null);
        }}
        onSubmit={handleEditSubmit}
        cliente={clienteSeleccionado || undefined}
        mode="edit"
      />

      {/* Modal: Renovar Membresía */}
      <RenovarMembresiaModal
        isOpen={showRenewModal}
        onClose={() => {
          setShowRenewModal(false);
          setClienteSeleccionado(null);
        }}
        onConfirm={handleConfirmRenew}
        clienteName={clienteSeleccionado?.name || ''}
        currentMembershipType={clienteSeleccionado?.membership_type || 'mes'}
      />

      {/* Modal: Confirmar Eliminación */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setClienteSeleccionado(null);
        }}
        onConfirm={handleConfirmDelete}
        titulo="¿Eliminar cliente?"
        mensaje={`¿Estás seguro de que deseas eliminar al cliente "${clienteSeleccionado?.name}"? Esta acción desactivará su membresía.`}
        type="danger"
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}