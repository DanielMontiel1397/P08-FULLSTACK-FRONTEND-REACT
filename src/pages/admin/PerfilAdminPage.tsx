import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatearFecha } from '../../data/AdminPerfil';
import ConfirmModal from '../../components/ConfirmModal';
import MensajeErrorInput from '../../components/MensajeErrorInput';
import { useAppStore } from '../../stores/useAppStore';
import Cargando from '../../components/Cargando';

// 📋 Schema de validación para el email
const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Ingresa un email válido')
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function PerfilAdminPage() {

  //Obtener funciones del STORE
  const cargando = useAppStore(state => state.loadingAdmin)
  const obtenerPerfil = useAppStore(state => state.getPerfil);
  const perfilAdministrador = useAppStore(state => state.perfilAdmin)
  const editarPefilAdministrador = useAppStore(state => state.editarPerfil);
  const cerrarSesionAdministrador = useAppStore(state => state.logOutAdministrador)

  //Estado Inicial Formulario
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ""
    }
  });

  //Mandar a llamar para obtener el usuario Administrador

  const obtenerPerfilAdministrador = async () => {
    await obtenerPerfil()
  }

  useEffect(() => {
    obtenerPerfilAdministrador()
  }, [])

  useEffect(() => {
    if (perfilAdministrador?.email) {
      reset({
        email: perfilAdministrador.email
      })
    }
  }, [perfilAdministrador, reset])



  // 🎛️ Estados
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  if (cargando) {
    return <Cargando message='Cargando perfil...' />
  }

  //Revisamos si estan editando el email para mostrar la advertencia.
  const watchEmail = watch('email');
  const emailHasChanged = watchEmail !== perfilAdministrador.email;

  //cambiamos de estado si se esta editando o no.
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Si se cancela la edicion, regresamos el formulario a como estaba al inicio.
  const handleCancel = () => {
    reset({ email: perfilAdministrador.email }); // Resetear al email original
    setIsEditing(false);
  };

  //Se presiono guardar cambios y mostramos modal para confirmar.
  const onSubmit = (data: EmailFormData) => {

    // Solo abrir modal si el email realmente cambió
    if (data.email !== perfilAdministrador.email) {
      setNewEmail(data.email);
      setShowModal(true);
    }

  };

  // Ejecutamos el cambio de Email
  const handleConfirmChange = async () => {
    const respuesta = await editarPefilAdministrador(newEmail);
    if (respuesta) {
      cerrarSesionAdministrador();
    }
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full overflow-auto bg-zinc-950 p-4 md:p-8 pt-20 md:pt-10">

      {/* 📌 Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">
          Perfil SuperAdministrador
        </h1>
        <p className="text-zinc-400 mt-2">
          Gestiona la información de tu cuenta
        </p>
      </div>

      {/* 📄 Card de Información */}
      <div className="max-w-2xl">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">

          {/* Título de la sección */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-100">
              Información de Cuenta
            </h2>

            {/* Botón Editar (solo visible si NO está editando) */}
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

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Campo Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                📧 Correo electrónico
              </label>

              {/* MODO VER */}
              {!isEditing ? (
                <div className="
                  bg-zinc-800 
                  border border-zinc-700
                  text-zinc-100 
                  rounded-lg 
                  px-4 py-2.5
                ">
                  {perfilAdministrador.email}
                </div>
              ) : (
                /* MODO EDITAR */
                <>
                  <input
                    type="email"
                    placeholder="admin@gym.com"
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

            {/* ⚠️ Advertencia (solo visible en modo editar) */}
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
                      Al cambiar tu email:
                    </p>
                    <ul className="text-xs text-yellow-200/80 space-y-1">
                      <li>• Tu sesión será cerrada automáticamente</li>
                      <li>• Deberás verificar el nuevo email</li>
                      <li>• Recibirás un correo de confirmación</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Estado de la cuenta */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                ✅ Estado de la cuenta
              </label>
              <div className={`
                px-4 py-2.5 rounded-lg
                ${perfilAdministrador.is_confirmed
                  ? 'bg-green-900/20 border border-green-600/50 text-green-400'
                  : 'bg-yellow-900/20 border border-yellow-600/50 text-yellow-400'
                }
              `}>
                {perfilAdministrador.is_confirmed ? 'Cuenta verificada' : 'Pendiente de verificación'}
              </div>
            </div>

            {/* Fecha de registro */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                📅 Miembro desde
              </label>
              <div className="
                bg-zinc-800 
                border border-zinc-700
                text-zinc-100 
                rounded-lg 
                px-4 py-2.5
              ">
                {formatearFecha(perfilAdministrador.createdAt)}
              </div>
            </div>

            {/* Botones de acción (solo visibles en modo editar) */}
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
                  disabled={!emailHasChanged}
                  className="
                    flex-1
                    px-4 py-2.5 
                    text-sm font-medium 
                    text-white 
                    bg-blue-600 
                    hover:bg-blue-700
                    disabled:bg-blue-400
                    disabled:cursor-not-allowed
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


      </div>

      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmChange}
        titulo="¿Confirmar cambio de email?"
        mensaje={`Estás a punto de cambiar tu email a: ${newEmail}. Tu sesión será cerrada y deberás verificar el nuevo email antes de volver a acceder.`}
        type="warning"
        confirmText="Sí, cambiar email"
        cancelText="Cancelar"
      />
    </div>
  );

}
