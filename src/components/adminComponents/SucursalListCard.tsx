
import type { SucursalType } from '../../types/adminTypes/SucursalAdminType';

// 🎨 Props del componente
type SucursalListCardProps = {
  sucursal: SucursalType;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onToggleStatus?: (id: number, currentStatus: boolean) => void;
}

export default function SucursalListCard({ sucursal, onView, onEdit } : SucursalListCardProps) {

  return (
    <div className="
      bg-zinc-900 
      border border-zinc-800 
      rounded-xl 
      p-6 
      shadow-lg
      hover:border-zinc-700
      transition-all
      duration-200
    ">
      
      {/* Header: Nombre de la sucursal */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🏢</span>
        <h3 className="text-xl font-semibold text-zinc-100">
          {sucursal.name}
        </h3>
      </div>

      {/* Información de contacto */}
      <div className="space-y-2 mb-4">
        {/* Email */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>📧</span>
          <span>{sucursal.email}</span>
        </div>

        {/* Dirección */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>📍</span>
          <span>{sucursal.address}</span>
        </div>

        {/* Teléfono */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>📞</span>
          <span>{sucursal.phone}</span>
        </div>
      </div>

      {/* Badges de estado */}
      <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-zinc-800">
        
        {/* Badge: Verificada */}
        <span className={`
          px-3 py-1 
          rounded-full 
          text-xs font-medium
          ${sucursal.is_verified 
            ? 'bg-green-900/30 text-green-400 border border-green-600/50' 
            : 'bg-yellow-900/30 text-yellow-400 border border-yellow-600/50'
          }
        `}>
          {sucursal.is_verified ? '✅ Verificada' : '⚠️ Sin verificar'}
        </span>

        {/* Badge: Activa */}
        <span className={`
          px-3 py-1 
          rounded-full 
          text-xs font-medium
          ${sucursal.is_activated 
            ? 'bg-blue-900/30 text-blue-400 border border-blue-600/50' 
            : 'bg-red-900/30 text-red-400 border border-red-600/50'
          }
        `}>
          {sucursal.is_activated ? '✅ Activa' : '❌ Inactiva'}
        </span>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-2">
        
        {/* Botón Ver */}
        {onView && (
          <button
            onClick={() => onView(sucursal.id)}
            className="
              flex-1
              px-3 py-2
              text-sm font-medium
              text-zinc-300
              bg-zinc-800
              border border-zinc-700
              rounded-lg
              hover:bg-zinc-750
              hover:text-zinc-100
              transition-colors
              hover:cursor-pointer
            "
          >
            Ver
          </button>
        )}

        {/* Botón Editar */}
        {onEdit && (
          <button
            onClick={() => onEdit(sucursal.id)}
            className="
              flex-1
              px-3 py-2
              text-sm font-medium
              text-blue-400
              bg-blue-900/20
              border border-blue-600/50
              rounded-lg
              hover:bg-blue-900/30
              transition-colors
              hover:cursor-pointer
            "
          >
            Editar
          </button>
        )}

        {/* Botón Activar/Desactivar 
        {onToggleStatus && (
          <button
            onClick={() => onToggleStatus(sucursal.id, sucursal.is_activated)}
            className={`
              flex-1
              px-3 py-2
              text-sm font-medium
              rounded-lg
              transition-colors
              hover:cursor-pointer
              ${sucursal.is_activated
                ? 'text-red-400 bg-red-900/20 border border-red-600/50 hover:bg-red-900/30'
                : 'text-green-400 bg-green-900/20 border border-green-600/50 hover:bg-green-900/30'
              }
            `}
          >
            {sucursal.is_activated ? 'Desactivar' : 'Activar'}
          </button>
        )}

        */}
      </div>
    </div>
  );
}