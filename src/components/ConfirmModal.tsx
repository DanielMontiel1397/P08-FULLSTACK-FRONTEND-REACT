import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

type ConfirmModalProps = {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    titulo: string,
    mensaje: string,
    type?: 'danger' | 'warning' | 'info',
    confirmText?: string,
    cancelText?: string
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, titulo, mensaje, type = 'info', confirmText = 'Confirmar', cancelText = 'Cancelar' }: ConfirmModalProps) {

    const typeStyles = {
        danger: {
            icon: '⚠️',
            titleColor: 'text-red-400',
            buttonBg: 'bg-red-600 hover:bg-red-700',
            borderColor: 'border-red-600'
        },
        warning: {
            icon: '⚠️',
            titleColor: 'text-yellow-400',
            buttonBg: 'bg-yellow-600 hover:bg-yellow-700',
            borderColor: 'border-yellow-600'
        },
        info: {
            icon: 'ℹ️',
            titleColor: 'text-blue-400',
            buttonBg: 'bg-blue-600 hover:bg-blue-700',
            borderColor: 'border-blue-600'
        }
    };

    const styles = typeStyles[type];

    const handleConfirm = () => {
        onConfirm();
        onClose();
    }

    return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="relative z-50"
      transition
    >
      {/* Backdrop - Fondo oscuro */}
      <div 
        className="fixed inset-0 bg-black/70 transition duration-300 data-closed:opacity-0" 
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
          {/* Header con ícono y título */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{styles.icon}</span>
            <DialogTitle
              as="h3"
              className={`text-xl font-semibold ${styles.titleColor}`}
            >
              {titulo}
            </DialogTitle>
          </div>

          {/* Mensaje */}
          <div className="mt-2">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {mensaje}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex gap-3 justify-end">
            
            {/* Botón Cancelar */}
            <button
              type="button"
              onClick={onClose}
              className="
                px-4 py-2 
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
              {cancelText}
            </button>

            {/* Botón Confirmar */}
            <button
              type="button"
              onClick={handleConfirm}
              className={`
                px-4 py-2 
                text-sm font-medium 
                text-white 
                ${styles.buttonBg}
                rounded-lg 
                transition-colors
                hover:cursor-pointer
              `}
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
