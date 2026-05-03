import { useNavigate } from "react-router-dom"
import DashboardCard from "./DashboardCard"

type SucursalCardProps = {
    id: number,
    name: string,
    clientes: {
        total: number,
        activos: number,
        inactivos: number
    }
}

export default function SucursalCard({ id, name, clientes }: SucursalCardProps) {

    const navigate = useNavigate()

    const porcentajeActivos = clientes.total > 0 ? (clientes.activos / clientes.total) * 100 : 0

    const porcentajeInactivos = clientes.total > 0 ? (clientes.inactivos / clientes.total) * 100 : 0

    const handleVerMas = () => {
        navigate(`/admin/sucursales/${id}`);  // Navega al detalle
    };

    return (
        <div className="
            bg-zinc-900 
            border border-zinc-800 
            rounded-xl 
            p-6 
            shadow-lg   
            hover:border-zinc-700
            transition-all
            duration-200
            ">

            {/* Encabezado: Nombre de la sucursal + Botón "Ver más" */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🏢</span>
                    <h3 className="text-xl font-semibold text-zinc-100">
                        {name}
                    </h3>
                </div>

                <button
                    onClick={handleVerMas}
                    className="
                        text-sm text-blue-500 
                        hover:text-blue-400
                        font-medium
                        transition-colors
                        flex items-center gap-1
                        hover:cursor-pointer
                    "
                >
                    Ver más
                    <span>→</span>
                </button>
            </div>

            {/* Grid de 3 cards con estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Card: Total de clientes */}
                <DashboardCard
                    titulo="Total"
                    valor={clientes.total}
                    porcentaje={100}  // Siempre 100% porque es el total
                    color="blue"
                />

                {/* Card: Clientes activos */}
                <DashboardCard
                    titulo="Activos"
                    valor={clientes.activos}
                    porcentaje={porcentajeActivos}
                    color="green"
                />

                {/* Card: Clientes inactivos */}
                <DashboardCard
                    titulo="Inactivos"
                    valor={clientes.inactivos}
                    porcentaje={porcentajeInactivos}
                    color="red"
                />
            </div>
        </div>
    );
}
