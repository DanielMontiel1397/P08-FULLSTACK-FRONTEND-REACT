import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

//Props que recibira el comopnente
type DashboardCardprops = {
    titulo: string,
    valor: number,
    porcentaje: number,
    color?: 'blue' | 'green' | 'red' | 'yellow',
    icon?: string
}
export default function DashboardCard({ titulo, valor, porcentaje, color = 'blue', icon }: DashboardCardprops) {

    const colorMap = {
        blue: '#2563eb',
        green: '#10b981',
        red: '#ef4444',
        yellow: '#f59e0b'
    };

    return (
        <div className="
                    bg-zinc-900 
                    border border-zinc-800 
                    rounded-xl 
                    p-6 
                    shadow-lg
                    hover:border-zinc-700
                    transition-colors
                    duration-200
                    ">
                        
            {/* Encabezado con título e ícono */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-400">
                    {titulo}
                </h3>
                {icon && (
                    <span className="text-2xl">
                        {icon}
                    </span>
                )}
            </div>

            {/* Círculo progresivo + Valor numérico */}
            <div className="flex items-center justify-between">

                {/* Número grande a la izquierda */}
                <div className="flex-1">
                    <p className="text-4xl font-bold text-zinc-100">
                        {valor}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                        {porcentaje.toFixed(0)}% del total
                    </p>
                </div>

                {/* Círculo progresivo a la derecha */}
                <div className="w-20 h-20">
                    <CircularProgressbar
                        value={porcentaje}
                        text={`${porcentaje.toFixed(0)}%`}
                        styles={buildStyles({
                            // Color del texto dentro del círculo
                            textColor: '#f4f4f5',
                            textSize: '24px',

                            // Color de la barra de progreso (usa el color mapeado)
                            pathColor: colorMap[color],

                            // Color del fondo del círculo (gris oscuro)
                            trailColor: '#27272a',

                            // Transición suave al cambiar el porcentaje
                            pathTransitionDuration: 0.5,
                        })}
                    />
                </div>
            </div>
        </div>
    );
}
