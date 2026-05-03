import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import MensajeErrorInput from './MensajeErrorInput';
import type { SucursalFormularioEditarType, SucursalFormularioType } from '../types/adminTypes/SucursalAdminType';
import { sucursalFormularioSchema } from '../schemas/adminSchemas/adminSucursalesSchema';

type SucursalFormModalProps =
  | {
      mode: 'create';
      isOpen: boolean;
      onClose: () => void;
      onSubmit: (data: SucursalFormularioType) => void;
      sucursal?: undefined;
    }
  | {
      mode: 'edit';
      isOpen: boolean;
      onClose: () => void;
      onSubmit: (data: SucursalFormularioEditarType) => void;
      sucursal: SucursalFormularioEditarType;
    };

export default function SucursalFormModal({
  isOpen,
  onClose,
  onSubmit,
  sucursal,
  mode
}: SucursalFormModalProps) {

  // FORMULARIO CREAR / EDITAR SUCURSAL
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SucursalFormularioType>({
    resolver: zodResolver(sucursalFormularioSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: ''
    }
  });

  // RESETEAR FORMULARIO CUANDO CAMBIA CREAR EDITAR O CAMBIA SUCURSAL.
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && sucursal) {
        // Pre-llenar con datos de la sucursal
        reset({
          name: sucursal.name,
          email: sucursal.email,
          address: sucursal.address,
          phone: sucursal.phone
        });
      } else {
        // Limpiar formulario para crear
        reset({
          name: '',
          email: '',
          address: '',
          phone: ''
        });
      }
    }
  }, [isOpen, mode, sucursal, reset]);


  // ENVIAR FORMULARIO EDITAR O CREAR
  const handleFormSubmit = (data: SucursalFormularioType) => {
    if(mode === 'edit' && sucursal){

      const dataEditar: SucursalFormularioEditarType = {
        ...data,
        id: sucursal.id
      };
      
      onSubmit(dataEditar);

    } else {
      onSubmit(data);
    }
    onClose();
  };


  // ❌ Cerrar y resetear
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={handleClose} 
      className="relative z-50"
      transition
    >
      {/* Backdrop */}
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
            w-full max-w-lg
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
            <span className="text-3xl">🏢</span>
            <DialogTitle
              as="h3"
              className="text-2xl font-semibold text-zinc-100"
            >
              {mode === 'create' ? 'Crear Sucursal' : 'Editar Sucursal'}
            </DialogTitle>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            
            {/* Campo: Nombre */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Nombre de la sucursal
              </label>
              <input
                type="text"
                placeholder="Gym Centro"
                className="
                  w-full
                  bg-zinc-800 
                  border border-zinc-700
                  text-zinc-100 
                  rounded-lg 
                  px-4 py-2.5
                  placeholder-zinc-500
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-600
                "
                {...register('name')}
              />
              {errors.name?.message && (
                <MensajeErrorInput>{errors.name.message}</MensajeErrorInput>
              )}
            </div>

            {/* Campo: Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="gymcentro@gmail.com"
                className="
                  w-full
                  bg-zinc-800 
                  border border-zinc-700
                  text-zinc-100 
                  rounded-lg 
                  px-4 py-2.5
                  placeholder-zinc-500
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-600
                "
                {...register('email')}
              />
              {errors.email?.message && (
                <MensajeErrorInput>{errors.email.message}</MensajeErrorInput>
              )}
            </div>

            {/* Campo: Dirección */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Dirección
              </label>
              <input
                type="text"
                placeholder="Av. Principal 123, Col. Centro"
                className="
                  w-full
                  bg-zinc-800 
                  border border-zinc-700
                  text-zinc-100 
                  rounded-lg 
                  px-4 py-2.5
                  placeholder-zinc-500
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-600
                "
                {...register('address')}
              />
              {errors.address?.message && (
                <MensajeErrorInput>{errors.address.message}</MensajeErrorInput>
              )}
            </div>

            {/* Campo: Teléfono */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                placeholder="4431234567"
                className="
                  w-full
                  bg-zinc-800 
                  border border-zinc-700
                  text-zinc-100 
                  rounded-lg 
                  px-4 py-2.5
                  placeholder-zinc-500
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-600
                "
                {...register('phone')}
              />
              {errors.phone?.message && (
                <MensajeErrorInput>{errors.phone.message}</MensajeErrorInput>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={handleClose}
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
                type="submit"
                className="
                  flex-1
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
                {mode === 'create' ? 'Crear Sucursal' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}