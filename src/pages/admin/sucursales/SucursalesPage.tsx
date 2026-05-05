import { useEffect, useState } from 'react';
import SucursalListCard from '../../../components/adminComponents/SucursalListCard';
import Paginacion from '../../../components/Paginacion';
import SucursalFormModal from '../../../components/SucursalFormModal';
//import ConfirmModal from '../../../components/ConfirmModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppStore } from '../../../stores/useAppStore';
import type { SucursalFormularioEditarType, SucursalFormularioType } from '../../../types/adminTypes/SucursalAdminType';

export default function SucursalesPage() {
  const navigate = useNavigate();

  /////OBTENER FUNCIONES STORE
  const obtenerSucursales = useAppStore(state => state.obtenerSucursalesAdministrador);
  const sucursales = useAppStore(state => state.sucursales);
  const paginacion = useAppStore(state => state.paginacionSucursales);
  const crearSucursal = useAppStore(state => state.crearSucursal);
  const editarSucursal = useAppStore(state => state.editarSucursal);

  //OBTENER QUERYS DE URL
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10')


  useEffect(() => {
    obtenerSucursales(page, limit);
  }, [page, limit, obtenerSucursales])

  // 🎛️ Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<SucursalFormularioEditarType | null>(null);

  //PENDIENTE ACTIVAR - DESACTIVAR SUCURSAL
  //const [showConfirmModal, setShowConfirmModal] = useState(false);
  //const [accionConfirm, setAccionConfirm] = useState<'activar' | 'desactivar'>('desactivar');

  // CAMBIAR PAGINA HANDLER
  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: newPage.toString(),
      limit: limit.toString()
    })
  };


  /////CREAR SUCURSAL/////
  const handleCreateSubmit = async (data: SucursalFormularioType) => {
    await crearSucursal(data);
  };

  // VER SUCURSAL HANDLER
  const handleView = (id: number) => {
    console.log('Ver sucursal:', id);
    navigate(`/admin/sucursales/${id}`); //Ir a página de detalle
  };

  // ENVIAR FORMULARIO PARA EDITAR SUCURSAL HANDLER
  const handleEditSubmit = async (data: SucursalFormularioEditarType) => {
    await editarSucursal(data);
    setSucursalSeleccionada(null);
  };

  // AGREGAR A FORMULARIO SUCURSAL A EDITAR
  const handleEdit = (id: number) => {
    const sucursal = sucursales.find(s => s.id === id);
    if (sucursal) {
      setSucursalSeleccionada(sucursal);
      setShowEditModal(true);
    }
  };

  /////PENDIENTE ACTIVAR O DESACTIVAR SUCURSAL

  /*
  // ACTIVAR O DESACTIVAR SUCURSAL HANDLER (PENDIENTE)
  const handleToggleStatus = (id: number, currentStatus: boolean) => {
    const sucursal = sucursales.find(s => s.id === id);
    if (sucursal) {
      setSucursalSeleccionada(sucursal);
      setAccionConfirm(currentStatus ? 'desactivar' : 'activar');
      setShowConfirmModal(true);
    }
  };

  // HANDLER MODAL PARA CAMBIO DE ESTADO (PENDIENTE)

  const handleConfirmToggle = () => {
    console.log(`${accionConfirm} sucursal:`, sucursalSeleccionada?.id);
    // TODO: Llamar al backend para cambiar estado
    setSucursalSeleccionada(null);
  };
*/

  return (
    <div className="w-full h-full overflow-auto bg-zinc-950 p-8">

      {/* 📌 Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">
            Sucursales
          </h1>
          <p className="text-zinc-400 mt-2">
            Gestiona todas las sucursales del sistema
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
            hover:cursor-pointer
          "
        >
          <span className="text-lg">+</span>
          Nueva Sucursal
        </button>
      </div>

      {/* 📊 Grid de Sucursales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {sucursales.map((sucursal) => (
          <SucursalListCard
            key={sucursal.id}
            sucursal={sucursal}
            onView={handleView}
            onEdit={handleEdit}
            //onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {/* Paginación de Sucursales*/}
      <Paginacion
        paginaActual={paginacion.pagina}
        totalPaginas={paginacion.totalPaginas}
        totalRegistros={paginacion.totalSucursales}
        registrosPorPagina={paginacion.limite}
        onPageChange={handlePageChange}
      />

      {/* Modal para Crear Sucursal */}
      <SucursalFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateSubmit}
        mode="create"
      />

      {/* Modal: Editar Sucursal, si hay una sucursal seleccionada se puede abrir el modal */}
      {sucursalSeleccionada && (
        <SucursalFormModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSucursalSeleccionada(null);
          }}
          onSubmit={handleEditSubmit}
          sucursal={sucursalSeleccionada}
          mode="edit"
        />
      )}

      {/* Modal: Confirmar Activar/Desactivar 
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setSucursalSeleccionada(null);
        }}
        onConfirm={handleConfirmToggle}
        titulo={`¿${accionConfirm === 'activar' ? 'Activar' : 'Desactivar'} sucursal?`}
        mensaje={`¿Estás seguro de que deseas ${accionConfirm} la sucursal "${sucursalSeleccionada?.name}"?`}
        type={accionConfirm === 'desactivar' ? 'warning' : 'info'}
        confirmText={accionConfirm === 'activar' ? 'Sí, activar' : 'Sí, desactivar'}
        cancelText="Cancelar"
      />
      */}
    </div>
  );
}