import { Outlet } from 'react-router-dom';

export default function ConfirmarLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Contenido dinámico */}
        <Outlet />

        {/* Footer fijo */}
        <div className="mt-5 text-center space-y-3">
          <p className="text-zinc-500 text-sm">
            © 2026 Gym - Sostenes Daniel Ponce Montiel
          </p>
    
        </div>
      </div>
    </div>
  );
}