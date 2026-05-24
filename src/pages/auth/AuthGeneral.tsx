export default function AuthGeneral() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-8 text-center">
      
      {/* Logo/Icono principal */}
      <div className="mb-6 md:mb-8">
        <span className="text-7xl md:text-9xl">🏋️</span>
      </div>

      {/* Título */}
      <h1 className="text-3xl md:text-5xl font-black text-zinc-100 mb-3 md:mb-4">
        ADMINISTRADOR DE GIMNASIO
      </h1>
      
      <p className="text-base md:text-xl text-zinc-400 mb-8 md:mb-12">
        Sistema para la gestión de gimnasios
      </p>

      {/* Features minimalistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
        
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg">
          <span className="text-4xl mb-3 block">👥</span>
          <p className="text-sm font-medium text-zinc-300">
            Gestión de Clientes
          </p>
        </div>

        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg">
          <span className="text-4xl mb-3 block">🏢</span>
          <p className="text-sm font-medium text-zinc-300">
            Multi-Sucursal
          </p>
        </div>
      </div>

      {/* Footer simple */}
      <p className="text-sm text-zinc-500">
        © 2026 Gym - Sostenes Daniel Ponce Montiel
      </p>
    </div>
  );
}