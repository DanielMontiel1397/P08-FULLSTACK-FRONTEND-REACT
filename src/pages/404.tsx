import { useNavigate } from 'react-router-dom';

export default function NotFoundView() {
  const navigate = useNavigate();

  const handleVolverInicio = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Card principal */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center space-y-6">
            
            {/* Icono 404 */}
            <div className="flex justify-center">
              <div className="
                w-24 h-24 
                bg-zinc-800/50
                border-2 border-zinc-700
                rounded-full 
                flex items-center justify-center
              ">
                <span className="text-6xl">🔍</span>
              </div>
            </div>

            <div>
              <h1 className="text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-700 mb-2">
                404
              </h1>
              <h2 className="text-2xl font-bold text-zinc-100 mb-3">
                Página No Encontrada
              </h2>
              <p className="text-zinc-400 max-w-md mx-auto">
                Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">

              <button
                onClick={handleVolverInicio}
                className="
                  flex-1
                  px-6 py-3
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-medium
                  rounded-lg
                  transition-colors
                  hover:cursor-pointer
                "
              >
                Ir al inicio
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-zinc-500 text-sm">
            © 2026 Gym Management System
          </p>

        </div>
      </div>
    </div>
  );
}