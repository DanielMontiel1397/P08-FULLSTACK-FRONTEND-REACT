import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import MensajeErrorInput from '../../components/MensajeErrorInput';
import { crearPasswordSucursalSchema } from '../../schemas/authSchema';
import { useAppStore } from '../../stores/useAppStore';
import type { TokenUrlType } from '../../types/ConfirmarCuentaType';


type CrearPasswordFormData = z.infer<typeof crearPasswordSucursalSchema>;

export default function CrearPasswordSucursal() {
    const { token } = useParams<{ token: TokenUrlType }>();
    const navigate = useNavigate();

    const crearPasswordSucursal = useAppStore(state => state.crearPasswordSucursal);
    const loading = useAppStore(state => state.loading);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CrearPasswordFormData>({
        resolver: zodResolver(crearPasswordSucursalSchema)
    });

    const onSubmit = async (data: CrearPasswordFormData) => {
       if(!token){
        return navigate('/auth/loginSucursal')
       }

        const respuesta = await crearPasswordSucursal(data.password, token);

        if(respuesta){
            return navigate('/auth/loginSucursal')
        }

        reset();
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8">

            {/* Header */}
            <div className="mb-8 text-center">
                <div className="flex justify-center mb-4">
                    <div className="
            w-16 h-16 
            bg-blue-900/30
            border-2 border-blue-600/50
            rounded-full 
            flex items-center justify-center
          ">
                        <span className="text-3xl">🔒</span>
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-zinc-100">
                    Crear Contraseña
                </h1>
            </div>

            {/* Formulario */}
            <form
                className="space-y-5"
                onSubmit={handleSubmit(onSubmit)}
            >

                {/* Campo: Nueva contraseña */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-zinc-300">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="
              bg-zinc-800 border border-zinc-700
              text-zinc-100 rounded-lg px-4 py-2
              placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-blue-600
            "
                        {...register('password')}
                    />
                    {errors.password?.message && (
                        <MensajeErrorInput>{errors.password.message}</MensajeErrorInput>
                    )}
                </div>

                {/* Campo: Confirmar contraseña */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-zinc-300">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="
              bg-zinc-800 border border-zinc-700
              text-zinc-100 rounded-lg px-4 py-2
              placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-blue-600
            "
                        {...register('confirmarPassword')}
                    />
                    {errors.confirmarPassword?.message && (
                        <MensajeErrorInput>{errors.confirmarPassword.message}</MensajeErrorInput>
                    )}
                </div>

                {/* Info de requisitos */}
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3">
                    <p className="text-xs text-zinc-400 mb-2">
                        Tu contraseña debe tener:
                    </p>
                    <ul className="text-xs text-zinc-500 space-y-1">
                        <li className="flex items-center gap-2">
                            <span className="text-blue-400">•</span>
                            Mínimo 6 caracteres
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-blue-400">•</span>
                            Máximo 50 caracteres
                        </li>
                    </ul>
                </div>

                {/* Botón submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
            hover:cursor-pointer
            w-full mt-6
            bg-blue-600 hover:bg-blue-700
            disabled:bg-blue-400 disabled:cursor-not-allowed
            text-white font-medium
            py-2.5 rounded-lg
            transition-colors
            flex items-center justify-center gap-2
          "
                >
                    {loading && (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {loading ? 'Guardando...' : 'Guardar contraseña'}
                </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
                <button
                    onClick={() => navigate('/auth/loginSucursal')}
                    className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors hover:cursor-pointer"
                >
                    ← Volver al inicio de sesión
                </button>
            </div>
        </div>
    );
}