import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getSucursalById } from '../../../data/SucursalesData';
import ConfirmModal from '../../../components/ConfirmModal';
import MensajeErrorInput from '../../../components/MensajeErrorInput';

// 📋 Schema de validación
const sucursalSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Ingresa un email válido'),
  address: z
    .string()
    .min(1, 'La dirección es obligatoria')
    .min(5, 'La dirección debe tener al menos 5 caracteres'),
  phone: z
    .string()
    .min(1, 'El teléfono es obligatorio')
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no debe exceder 15 dígitos')
    .regex(/^[0-9]+$/, 'El teléfono solo debe contener números')
});

type SucursalFormData = z.infer<typeof sucursalSchema>;

export default function DetalleSucursalPage() {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 🎛️ Estados
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<SucursalFormData | null>(null);



  // 📊 Obtener sucursal por ID
  const sucursal = getSucursalById(Number(id));

  // 📝 React Hook Form
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<SucursalFormData>({
    resolver: zodResolver(sucursalSchema),
    defaultValues: {
      name: sucursal?.name || '',
      email: sucursal?.email || '',
      address: sucursal?.address || '',
      phone: sucursal?.phone || ''
    }
  });

  // 🔄 Si no existe la sucursal, redirigir
  useEffect(() => {
    if (!sucursal) {
      navigate('/admin/sucursales');
    }
  }, [sucursal, navigate]);

  // 👀 Observar cambios en el email
  const watchEmail = watch('email');
  const emailHasChanged = watchEmail !== sucursal?.email;

  // 🔄 Activar modo edición
  const handleEdit = () => {
    setIsEditing(true);
  };

  // ❌ Cancelar edición
  const handleCancel = () => {
    reset({
      name: sucursal?.name,
      email: sucursal?.email,
      address: sucursal?.address,
      phone: sucursal?.phone
    });
    setIsEditing(false);
  };

  // 💾 Preparar para guardar (abrir modal)
  const onSubmit = (data: SucursalFormData) => {
    setFormData(data);
    setShowModal(true);
  };

  // ✅ Confirmar cambios
  const handleConfirmSave = () => {
    console.log('Guardar cambios:', formData);
    // TODO: Llamar al backend
    // Si cambió el email, backend enviará correo de verificación
    setIsEditing(false);
  };

  // 👥 Navegar a clientes de la sucursal
  const handleVerClientes = () => {
    navigate(`/admin/sucursales/${id}/clientes`);
  };

  // ← Volver a lista
  const handleVolver = () => {
    navigate('/admin/sucursales');
  };

  // Si no hay sucursal, no renderizar nada (el useEffect redirige)
  if (!sucursal) return null;

  return (
    <div className="w-full h-full overflow-auto bg-zinc-950 p-4 md:p-8 pt-20 md:pt-10">

      {/* 📌 Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleVolver}
            className="
              flex items-center gap-2
              text-sm text-zinc-400
              hover:text-zinc-300
              transition-colors
              hover:cursor-pointer
            "
          >
            ← Volver
          </button>

          {!isEditing && (
            <button
              onClick={handleEdit}
              className="
                text-sm text-blue-500 
                hover:text-blue-400
                font-medium
                transition-colors
                hover:cursor-pointer
              "
            >
              Editar
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-4xl">🏢</span>
          <h1 className="text-3xl font-bold text-zinc-100">
            {sucursal.name}
          </h1>
        </div>
      </div>

      <div className="max-w-2xl space-y-4">

        {/* 📄 Card de Información */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">
            Información de la Sucursal
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Campo: Nombre */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Nombre
              </label>
              {!isEditing ? (
                <div className="
                  bg-zinc-800 
                  border border-zinc-700
                  text-zinc-100 
                  rounded-lg 
                  px-4 py-2.5
                ">
                  {sucursal.name}
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Campo: Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                📧 Correo electrónico
              </label>
              {!isEditing ? (
                <div className="
                  bg-zinc-800 
                  border border-zinc-700
                  text-zinc-100 
                  rounded-lg 
                  px-4 py-2.5
                ">
                  {sucursal.email}
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* ⚠️ Advertencia email */}
            {isEditing && emailHasChanged && (
              <div className="
                bg-yellow-900/20 
                border border-yellow-600/50
                rounded-lg 
                p-4
              ">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="text-sm font-semibold text-yellow-400 mb-2">
                      Al cambiar el email:
                    </p>
                    <ul className="text-xs text-yellow-200/80 space-y-1">
                      <li>• La sucursal deberá verificar el nuevo email</li>
                      <li>• Se enviará un correo de confirmación</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Campo: Dirección */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                📍 Dirección
              </label>
              {!isEditing ? (
                <div className="
                  bg-zinc-800 
                  border border-zinc-700
                  text-zinc-100 
                  rounded-lg 
                  px-4 py-2.5
                ">
                  {sucursal.address}
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Campo: Teléfono */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                📞 Teléfono
              </label>
              {!isEditing ? (
                <div className="
                  bg-zinc-800 
                  border border-zinc-700
                  text-zinc-100 
                  rounded-lg 
                  px-4 py-2.5
                ">
                  {sucursal.phone}
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Estados */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Estado
              </label>
              <div className="flex flex-wrap gap-2">
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
            </div>

            {/* Botones de acción (solo en modo editar) */}
            {isEditing && (
              <div className="flex gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={handleCancel}
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
                  Guardar cambios
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 📄 Card de Clientes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">
            Clientes
          </h2>
          <p className="text-sm text-zinc-400 mb-4">
            Gestiona los clientes de esta sucursal
          </p>
          <button
            onClick={handleVerClientes}
            className="
              w-full
              flex items-center justify-center gap-2
              px-4 py-2.5
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
            Ver Clientes de esta Sucursal
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmSave}
        titulo="¿Guardar cambios?"
        mensaje={`¿Estás seguro de que deseas guardar los cambios en la sucursal "${sucursal.name}"?${emailHasChanged ? ' Se enviará un correo de verificación al nuevo email.' : ''}`}
        type="info"
        confirmText="Sí, guardar"
        cancelText="Cancelar"
      />
    </div>
  );
}