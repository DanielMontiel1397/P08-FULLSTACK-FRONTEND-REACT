import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ClienteCard from '../../../components/ClienteCard';
import { useAppStore } from '../../../stores/useAppStore';
import Paginacion from '../../../components/Paginacion';
import type { ClienteType, ClienteFormType } from '../../../types/clienteTypes/ClienteType';
import ClienteFormModal from '../../../components/ClienteFormModal';
import RenovarMembresiaModal from '../../../components/RenovarMembresiaModal';
import ConfirmModal from '../../../components/ConfirmModal';

export default function ClientesSucursal() {


  /////OBTENER STORE 

  const obtenerClientes = useAppStore(state => state.obtenerClientesSucursal);
  const clientes = useAppStore(state => state.clientes);
  const sucursalPerfil = useAppStore(state => state.perfilSucursal)
  const paginacion = useAppStore(state => state.paginacionClientes)
  const crearCliente = useAppStore(state => state.crearCliente);
  const editarCliente = useAppStore(state => state.editarCliente);
  const editarMembresiaCliente = useAppStore(state => state.editarMembresiaCliente);
  const eliminarCliente = useAppStore(state => state.eliminarCliente);

  ///OBTENER QUERYS DE URL
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '8')

  useEffect(() => {
    obtenerClientes(page, limit);
  }, [page, limit, obtenerClientes])

  ///////EDICION SUCURSAL//////////

  //Paginacion
  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: newPage.toString(),
      limit: limit.toString()
    })
  };

  const clienteInicial: ClienteType = {
    id: 0,
    name: '',
    age: 0,
    phone: '',
    membership_type: "semana",
    membership_end: '',
    membership_start: '',
    is_activated: false
  }

  // 🎛️ Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteType>(clienteInicial);

  ///EDICION DE CLIENTE

  // 💾 Handler: Crear cliente
  const handleCreateSubmit = async (data: ClienteFormType) => {
    await crearCliente(data);
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
  const handleConfirmDelete = async () => {

    await eliminarCliente(clienteSeleccionado.id.toString());

    setClienteSeleccionado(clienteInicial);
  };

  // ✅ Handler: Confirmar renovación
  const handleConfirmRenew = async (membershipType: ClienteFormType['membership_type']) => {

    await editarMembresiaCliente(clienteSeleccionado.id.toString(), membershipType);
    setClienteSeleccionado(clienteInicial);
  };

  // 💾 Handler: Guardar edición
  const handleEditSubmit = async (data: Partial<ClienteFormType>) => {

    if (!clienteSeleccionado) return;

    await editarCliente(clienteSeleccionado.id.toString(), data)
    setClienteSeleccionado(clienteInicial);
  };

  return (
    <div className="w-full h-full overflow-auto bg-zinc-950 p-4 md:p-8 pt-20 md:pt-10">

      {/* 📌 Header */}
      <div className="mb-8">


        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">
              Clientes de {sucursalPerfil.name}
            </h1>
            <p className="text-zinc-400 mt-2">
              Gestiona los clientes de esta sucursal
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors hover:cursor-pointer"
          >
            <span className="text-lg">+</span>
            Nuevo Cliente
          </button>

        </div>
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
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
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
          setClienteSeleccionado(clienteInicial);
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
          setClienteSeleccionado(clienteInicial);
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
          setClienteSeleccionado(clienteInicial);
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