// 🎨 Props del componente
type PaginacionProps = {
  paginaActual: number;
  totalPaginas: number;
  totalRegistros: number;
  registrosPorPagina: number;
  onPageChange: (page: number) => void;
}

export default function Paginacion({paginaActual,totalPaginas,totalRegistros,registrosPorPagina,onPageChange} : PaginacionProps) {

  // 🧮 Calcular rango de registros que se están mostrando
  const inicio = (paginaActual - 1) * registrosPorPagina + 1;
  const fin = Math.min(paginaActual * registrosPorPagina, totalRegistros);

  // 🔢 Generar array de números de página a mostrar
  const generarNumerosPagina = () => {
    const paginas: (number | string)[] = [];
    
    // Si hay 7 páginas o menos, mostrar todas
    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
      return paginas;
    }

    // Siempre mostrar primera página
    paginas.push(1);

    // Calcular rango alrededor de la página actual
    let rangoInicio = Math.max(2, paginaActual - 1);
    let rangoFin = Math.min(totalPaginas - 1, paginaActual + 1);

    // Ajustar si estamos cerca del inicio
    if (paginaActual <= 3) {
      rangoFin = 5;
    }

    // Ajustar si estamos cerca del final
    if (paginaActual >= totalPaginas - 2) {
      rangoInicio = totalPaginas - 4;
    }

    // Agregar "..." si hay gap después de la primera página
    if (rangoInicio > 2) {
      paginas.push('...');
    }

    // Agregar páginas del rango
    for (let i = rangoInicio; i <= rangoFin; i++) {
      paginas.push(i);
    }

    // Agregar "..." si hay gap antes de la última página
    if (rangoFin < totalPaginas - 1) {
      paginas.push('...');
    }

    // Siempre mostrar última página
    paginas.push(totalPaginas);

    return paginas;
  };

  const numerosPagina = generarNumerosPagina();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      
      {/* Resumen de registros */}
      <div className="text-sm text-zinc-400">
        Mostrando <span className="font-medium text-zinc-300">{inicio}-{fin}</span> de{' '}
        <span className="font-medium text-zinc-300">{totalRegistros}</span> 
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center gap-2">
        
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="
            px-3 py-2
            text-sm font-medium
            text-zinc-300
            bg-zinc-800
            border border-zinc-700
            rounded-lg
            hover:bg-zinc-750
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:bg-zinc-800
            transition-colors
            hover:cursor-pointer
          "
        >
          ← Anterior
        </button>

        {/* Números de página */}
        <div className="hidden sm:flex items-center gap-1">
          {numerosPagina.map((numero, index) => {
            // Si es "...", mostrar solo texto
            if (numero === '...') {
              return (
                <span 
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-zinc-500"
                >
                  ...
                </span>
              );
            }

            // Botón de número de página
            const pageNumber = numero as number;
            const isActive = pageNumber === paginaActual;

            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`
                  px-3 py-2
                  text-sm font-medium
                  rounded-lg
                  transition-colors
                  hover:cursor-pointer
                  ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-300 bg-zinc-800 border border-zinc-700 hover:bg-zinc-750'
                  }
                `}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Indicador de página en móvil */}
        <div className="sm:hidden text-sm text-zinc-400">
          Página {paginaActual} de {totalPaginas}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={() => onPageChange(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="
            px-3 py-2
            text-sm font-medium
            text-zinc-300
            bg-zinc-800
            border border-zinc-700
            rounded-lg
            hover:bg-zinc-750
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:bg-zinc-800
            transition-colors
            hover:cursor-pointer
          "
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}