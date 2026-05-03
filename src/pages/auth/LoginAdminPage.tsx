import { useForm } from 'react-hook-form'
import type { LoginType } from '../../types/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../schemas/authSchema'
import MensajeErrorInput from '../../components/MensajeErrorInput'
import { useAppStore } from '../../stores/useAppStore'

export default function LoginAdminPage() {

  //Importar Store
  const autenticarAdministrador = useAppStore(state => state.loginSuperAdmin);
  const loading = useAppStore(state => state.loading);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginType>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (data: LoginType) => {
    autenticarAdministrador(data);
    reset({
      password: ''
    })
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-800">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-100">
            Acceso Administrador
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Ingrese sus credenciales para continuar
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-300">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="admin@gym.com"
              className="
                bg-zinc-800 border border-zinc-700
                text-zinc-100 rounded-lg px-4 py-2
                placeholder-zinc-500
                focus:outline-none focus:ring-2 focus:ring-blue-600
              "
              {...register('email')}
            />

            {errors.email?.message && <MensajeErrorInput>{errors.email.message}</MensajeErrorInput>}
          </div>

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

            {errors.password?.message && <MensajeErrorInput>{errors.password.message}</MensajeErrorInput>}

          </div>

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
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-xs text-zinc-500">
            Panel administrativo del gimnasio
          </span>
        </div>
        <div className="mt-6 p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
          <p className="text-xs text-zinc-400 text-center mb-2">
            Credenciales de prueba
          </p>
          <div className="text-xs text-zinc-300 text-center space-y-1">
            <p><span className="text-zinc-500">Email:</span> avostrong@gmail.com</p>
            <p><span className="text-zinc-500">Password:</span> 123456</p>
          </div>
        </div>
      </div>
    </div>
  )
}
