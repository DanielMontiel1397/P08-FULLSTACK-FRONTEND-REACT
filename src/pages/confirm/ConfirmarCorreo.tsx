import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type TokenUrlType, type ConfirmarEmailAdministradorType } from '../../types/ConfirmarCuentaType';
import { useAppStore } from '../../stores/useAppStore';


export default function ConfirmarCorreo() {

  const { token } = useParams<{ token: TokenUrlType }>();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');

  const [respuestaValidarEmail, setRespuestaValidarEmail] = useState<ConfirmarEmailAdministradorType | null>(null)

  //Obtener funciones del store
  const validarEmailAdministrador = useAppStore(state => state.confirmarEmailAdministrador);
  const loading = useAppStore(state => state.loading);

  useEffect(() => {
    const confirmarCuenta = async () => {
      if (!token) {
       // setEstado('error');
        setMensaje('Token no válido');
        return;
      }

      const respuesta = await validarEmailAdministrador(token);
      console.log(respuesta);
      setRespuestaValidarEmail(respuesta);
      setMensaje(respuesta.msg)

    };

    confirmarCuenta();
  }, [token]);

  const handleVolverLogin = () => {
    navigate('/auth/loginAdmin');
  };


  return (
    <div className=" bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card principal */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">

          {/* Estado: Loading */}
          {loading && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="
                  w-16 h-16 
                  border-4 border-blue-600 border-t-transparent 
                  rounded-full 
                  animate-spin
                "></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                  Verificando...
                </h2>
                <p className="text-zinc-400">
                  Estamos confirmando tu email
                </p>
              </div>
            </div>
          )}

          {/* Estado: Success */}
          {respuestaValidarEmail?.estado === 'success' && (
            <div className="text-center space-y-6">
              {/* Icono de éxito */}
              <div className="flex justify-center">
                <div className="
                  w-20 h-20 
                  bg-green-900/30 
                  border-2 border-green-600/50
                  rounded-full 
                  flex items-center justify-center
                ">
                  <span className="text-5xl">✅</span>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                  ¡Email Confirmado!
                </h2>
                <p className="text-zinc-400">
                  {mensaje}
                </p>
              </div>

              {/* Botón */}
              <button
                onClick={handleVolverLogin}
                className="
                  w-full
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
                Ir al inicio de sesión
              </button>
            </div>
          )}

          {/* Estado: Error */}
          {respuestaValidarEmail?.estado === 'error' && (
            <div className="text-center space-y-6">
              {/* Icono de error */}
              <div className="flex justify-center">
                <div className="
                  w-20 h-20 
                  bg-red-900/30 
                  border-2 border-red-600/50
                  rounded-full 
                  flex items-center justify-center
                ">
                  <span className="text-5xl">❌</span>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                  Error de Verificación
                </h2>
                <p className="text-zinc-400">
                  {mensaje}
                </p>
              </div>

              {/* Botón */}
              <button
                onClick={handleVolverLogin}
                className="
                  w-full
                  px-6 py-3
                  bg-zinc-800
                  hover:bg-zinc-700
                  text-zinc-100
                  font-medium
                  rounded-lg
                  border border-zinc-700
                  transition-colors
                  hover:cursor-pointer
                "
              >
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}