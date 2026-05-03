type CargandoTypeProps = {
  message?: string;
}

export default function Cargando({ message = "Cargando..." }: CargandoTypeProps) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center space-y-6">
        
        {/* Spinner animado */}
        <div className="flex justify-center">
          <div className="
            w-16 h-16 
            border-4 border-blue-600 border-t-transparent 
            rounded-full 
            animate-spin
          "></div>
        </div>

        {/* Mensaje */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">
            {message}
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Por favor espera un momento
          </p>
        </div>
      </div>
    </div>
  );
}