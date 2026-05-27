import { useEffect, useState } from "react";
import { useAppStore } from "../../stores/useAppStore"
import ConfirmModal from "../../components/ConfirmModal";
import MensajeErrorInput from "../../components/MensajeErrorInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { inputsPerfilSucursalEditarSchema } from "../../schemas/sucursalSchemas/sucursalPerfilSchema";
import type { PerfilSucursalFormDataType } from "../../types/sucursalTypes/sucursalPerfilTypes";




export default function PerfilSucursalPage() {

  const obtenerPerfilSucursal = useAppStore(state => state.getPerfilSucursal);
  const perfilSucursal = useAppStore(state => state.perfilSucursal);
  const editarSucursal = useAppStore(state => state.editarPerfilSucursal);

  useEffect(() => {
    obtenerPerfilSucursal();
  }, [obtenerPerfilSucursal])

  // Estado Inicial Formulario
  const { register, handleSubmit, formState: { errors, dirtyFields }, reset, control } = useForm<PerfilSucursalFormDataType>({
    resolver: zodResolver(inputsPerfilSucursalEditarSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: ""
    }
  });

  // Resetear formulario cuando cargue el perfil
  useEffect(() => {
    if (perfilSucursal) {
      reset({
        name: perfilSucursal.name || "",
        email: perfilSucursal.email || "",
        phone: perfilSucursal.phone || "",
        address: perfilSucursal.address || ""
      })
    }
  }, [perfilSucursal, reset])

  // 🎛️ Estados
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [changedFields, setChangedFields] = useState<Partial<PerfilSucursalFormDataType>>({});

  // Detectar cambios en los campos
  const name = useWatch({ control, name: 'name' });
  const email = useWatch({ control, name: 'email' });
  const phone = useWatch({ control, name: 'phone' });
  const address = useWatch({ control, name: 'address' });

  const hasChanges =
    name !== perfilSucursal?.name ||
    email !== perfilSucursal?.email ||
    phone !== perfilSucursal?.phone ||
    address !== perfilSucursal?.address;

  // Cambiar a modo edición
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Cancelar edición
  const handleCancel = () => {
    reset({
      name: perfilSucursal.name || "",
      email: perfilSucursal.email || "",
      phone: perfilSucursal.phone || "",
      address: perfilSucursal.address || ""
    });
    setIsEditing(false);
  };

  // Mostrar modal de confirmación
  const onSubmit = (data: PerfilSucursalFormDataType) => {

    const payload: Partial<PerfilSucursalFormDataType> = {};

    (Object.keys(dirtyFields) as Array<keyof PerfilSucursalFormDataType>).forEach((key) => {
      payload[key] = data[key];
    })

    if (Object.keys(payload).length === 0) return;

    setChangedFields(payload);
    setShowModal(true);

  };

  // Confirmar cambios
  const handleConfirmChange = async () => {
    editarSucursal(changedFields);
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full overflow-auto bg-zinc-950 p-8">

      {/* 📌 Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">
          Perfil de Sucursal
        </h1>
        <p className="text-zinc-400 mt-2">
          Gestiona la información de tu sucursal
        </p>
      </div>

      {/* 📄 Card de Información */}
      <div className="max-w-2xl">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">

          {/* Título de la sección */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-100">
              Información de la Sucursal
            </h2>

            {/* Botón Editar (solo visible si NO está editando) */}
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="text-sm text-blue-500 hover:text-blue-400 font-medium transition-colors hover:cursor-pointer"
              >
                Editar
              </button>
            )}
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Campo Nombre */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                🏢 Nombre de la sucursal
              </label>

              {!isEditing ? (
                <div className="bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5">
                  {perfilSucursal?.name}
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Nombre de la sucursal"
                    className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    {...register('name')}
                  />
                  {errors.name?.message && (
                    <MensajeErrorInput>{errors.name.message}</MensajeErrorInput>
                  )}
                </>
              )}
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                📧 Correo electrónico
              </label>

              {!isEditing ? (
                <div className="bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5">
                  {perfilSucursal?.email}
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="sucursal@gym.com"
                    className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    {...register('email')}
                  />
                  {errors.email?.message && (
                    <MensajeErrorInput>{errors.email.message}</MensajeErrorInput>
                  )}
                </>
              )}
            </div>

            {/* Campo Teléfono */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                📞 Teléfono
              </label>

              {!isEditing ? (
                <div className="bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5">
                  {perfilSucursal?.phone}
                </div>
              ) : (
                <>
                  <input
                    type="tel"
                    placeholder="4431234567"
                    className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5 placeholder-zinc-500 focus:outline-none focus:ring-2  focus:ring-blue-60"
                    {...register('phone')}
                  />
                  {errors.phone?.message && (
                    <MensajeErrorInput>{errors.phone.message}</MensajeErrorInput>
                  )}
                </>
              )}
            </div>

            {/* Campo Dirección */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                📍 Dirección
              </label>

              {!isEditing ? (
                <div className=" bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5">
                  {perfilSucursal?.address}
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Calle, número, ciudad..."
                    className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5 placeholder-zinc-500 focus:outline-none focus:ring-2  focus:ring-blue-600"
                    {...register('address')}
                  />
                  {errors.address?.message && (
                    <MensajeErrorInput>{errors.address.message}</MensajeErrorInput>
                  )}
                </>
              )}
            </div>

            {/* ⚠️ Advertencia (solo visible en modo editar si hay cambios) */}
            {isEditing && hasChanges && (
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
                      Cambios en tu sucursal:
                    </p>
                    <ul className="text-xs text-yellow-200/80 space-y-1">
                      {email !== perfilSucursal?.email && <li>• Tu email será actualizado y verificado</li>}
                      <li>• Los cambios se aplicarán inmediatamente</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Estado de la cuenta */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                ✅ Estado de la sucursal
              </label>
              <div className={`
                px-4 py-2.5 rounded-lg
                ${perfilSucursal?.is_activated
                  ? 'bg-green-900/20 border border-green-600/50 text-green-400'
                  : 'bg-yellow-900/20 border border-yellow-600/50 text-yellow-400'
                }
              `}>
                {perfilSucursal?.is_activated ? 'Sucursal verificada' : 'Pendiente de verificación'}
              </div>
            </div>

            {/* Botones de acción */}
            {isEditing && (
              <div className="flex gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-750 transition-colors hover:cursor-pointer
                  "
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!hasChanges}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg  transition-colors hover:cursor-pointer"
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
        titulo="¿Confirmar cambios?"
        mensaje="Estás a punto de actualizar la información de tu sucursal. ¿Continuar?"
        type="warning"
        confirmText="Sí, guardar cambios"
        cancelText="Cancelar"
      />
    </div>
  );
}