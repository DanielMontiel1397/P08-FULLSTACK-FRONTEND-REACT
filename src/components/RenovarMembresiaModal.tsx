import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

// 🎨 Props del componente
interface RenovarMembresiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (membershipType: 'semana' | 'mes' | 'anualidad') => void;
  clienteName: string;
  currentMembershipType: 'semana' | 'mes' | 'anualidad';
}

export default function RenovarMembresiaModal({
  isOpen,
  onClose,
  onConfirm,
  clienteName,
  currentMembershipType
}: RenovarMembresiaModalProps) {

  const [selectedType, setSelectedType] = useState<'semana' | 'mes' | 'anualidad'>(currentMembershipType);

  // ✅ Confirmar renovación
  const handleConfirm = () => {
    onConfirm(selectedType);
    onClose();
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="relative z-50"
      transition
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 transition duration-300 data-[closed]:opacity-0" 
        aria-hidden="true"
      />

      {/* Contenedor del modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        
        {/* Panel del modal */}
        <DialogPanel
          transition
          className="
            w-full max-w-md
            transform overflow-hidden 
            rounded-2xl 
            bg-zinc-900 
            border border-zinc-800
            p-6 
            shadow-xl 
            transition duration-300 
            data-closed:scale-95 
            data-closed:opacity-0
          "
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔄</span>
            <DialogTitle
              as="h3"
              className="text-2xl font-semibold text-zinc-100"
            >
              Renovar Membresía
            </DialogTitle>
          </div>

          {/* Contenido */}
          <div className="space-y-4">
            <p className="text-sm text-zinc-300">
              Renovar membresía de: <span className="font-semibold text-zinc-100">{clienteName}</span>
            </p>

            {/* Selector de tipo de membresía */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Selecciona el tipo de membresía
              </label>
              <div className="space-y-2">
                
                {/* Opción: Semanal */}
                <label className={`
                  flex items-center gap-3
                  p-4
                  rounded-lg
                  border-2
                  cursor-pointer
                  transition-all
                  ${selectedType === 'semana'
                    ? 'border-blue-600 bg-blue-900/20'
                    : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
                  }
                `}>
                  <input
                    type="radio"
                    name="membership"
                    value="semana"
                    checked={selectedType === 'semana'}
                    onChange={(e) => setSelectedType(e.target.value as 'semana')}
                    className="
                      w-4 h-4
                      text-blue-600
                      focus:ring-blue-600
                      focus:ring-offset-zinc-900
                    "
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-zinc-100">Semanal</span>
                    <p className="text-xs text-zinc-400">7 días de acceso</p>
                  </div>
                </label>

                {/* Opción: Mensual */}
                <label className={`
                  flex items-center gap-3
                  p-4
                  rounded-lg
                  border-2
                  cursor-pointer
                  transition-all
                  ${selectedType === 'mes'
                    ? 'border-blue-600 bg-blue-900/20'
                    : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
                  }
                `}>
                  <input
                    type="radio"
                    name="membership"
                    value="mes"
                    checked={selectedType === 'mes'}
                    onChange={(e) => setSelectedType(e.target.value as 'mes')}
                    className="
                      w-4 h-4
                      text-blue-600
                      focus:ring-blue-600
                      focus:ring-offset-zinc-900
                    "
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-zinc-100">Mensual</span>
                    <p className="text-xs text-zinc-400">30 días de acceso</p>
                  </div>
                </label>

                {/* Opción: Anual */}
                <label className={`
                  flex items-center gap-3
                  p-4
                  rounded-lg
                  border-2
                  cursor-pointer
                  transition-all
                  ${selectedType === 'anualidad'
                    ? 'border-blue-600 bg-blue-900/20'
                    : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
                  }
                `}>
                  <input
                    type="radio"
                    name="membership"
                    value="anualidad"
                    checked={selectedType === 'anualidad'}
                    onChange={(e) => setSelectedType(e.target.value as 'anualidad')}
                    className="
                      w-4 h-4
                      text-blue-600
                      focus:ring-blue-600
                      focus:ring-offset-zinc-900
                    "
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-zinc-100">Anual</span>
                    <p className="text-xs text-zinc-400">365 días de acceso</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                px-4 py-2.5 
                text-sm font-medium 
                text-zinc-300 
                bg-zinc-800 
                border border-zinc-700
                rounded-lg 
                hover:bg-zinc-750
                transition-colors
                hover:cursor-pointer
              "
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="
                flex-1
                px-4 py-2.5 
                text-sm font-medium 
                text-white 
                bg-green-600 
                hover:bg-green-700
                rounded-lg 
                transition-colors
                hover:cursor-pointer
              "
            >
              Renovar
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}