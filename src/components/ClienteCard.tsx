import type { ClienteType } from "../types/clienteTypes/ClienteType";

// 🎨 Props del componente
interface ClienteCardProps {
  cliente: ClienteType;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onRenew?: (id: number) => void;
  showSucursalBadge?: boolean;
}

export default function ClienteCard({
  cliente,
  onEdit,
  onDelete,
  onRenew
}: ClienteCardProps) {

  // 📅 Formatear fechas
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // 🏷️ Mapeo de tipos de membresía
  type MemberShipLabelsType = {
    semana: string,
    mes: string,
    anualidad: string
  }

  const membershipLabels: MemberShipLabelsType = {
    semana: 'Semanal',
    mes: 'Mensual',
    anualidad: 'Anual'
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg hover:border-zinc-700 transition-all duration-200">

      {/* Header: Nombre del cliente */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">👤</span>
        <h3 className="text-xl font-semibold text-zinc-100 break-words">
          {cliente.name}
        </h3>
      </div>

      {/* Información del cliente */}
      <div className="space-y-2 mb-4">
        {/* Edad */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>🎂</span>
          <span>{cliente.age} años</span>
        </div>

        {/* Teléfono */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>📞</span>
          <span>{cliente.phone}</span>
        </div>

        {/* Tipo de membresía */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>💳</span>
          <span>{membershipLabels[cliente.membership_type]}</span>
        </div>

        {/* Fechas de membresía */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>📅</span>
          <span className="text-xs break-words">
            {formatDate(cliente.membership_start)} - {formatDate(cliente.membership_end)}
          </span>
        </div>
      </div>

      {/* Badges de estado */}
      <div className="mb-4 pb-4 border-b border-zinc-800 space-y-2">

        {/* Badge de estado activo/inactivo */}
        <div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${cliente.is_activated ? 'bg-green-900/30 text-green-400 border border-green-600/50' : 'bg-red-900/30 text-red-400 border border-red-600/50'}`}>
            {cliente.is_activated ? '✅ Activo' : '❌ Inactivo'}
          </span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-2">

        {/* Botón Editar */}
        {onEdit && (
          <button
            onClick={() => onEdit(cliente.id)}
            className="hover:cursor-pointer flex-1 px-3 py-2 text-sm font-medium text-blue-400 bg-blue-900/20 border border-blue-600/50 rounded-lg hover:bg-blue-900/30 transition-colors"
          >
            Editar
          </button>
        )}

        {/* Botón Renovar */}
        {onRenew && (
          <button
            onClick={() => onRenew(cliente.id)}
            className="hover:cursor-pointer flex-1 px-3 py-2 text-sm font-medium text-green-400 bg-green-900/20 border border-green-600/50 rounded-lg hover:bg-green-900/30 transition-colors"
          >
            Renovar
          </button>
        )}

        {/* Botón Eliminar */}
        {onDelete && (
          <button
            disabled={!cliente.is_activated}
            onClick={() => onDelete(cliente.id)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors
              ${cliente.is_activated
                ? 'text-red-400 bg-red-900/20 border border-red-600/50 hover:bg-red-900/30 hover:cursor-pointer'
                : 'text-gray-500 bg-gray-800 border border-gray-700 cursor-not-allowed opacity-50'
              }
  `}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}