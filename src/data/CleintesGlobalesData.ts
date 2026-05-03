// ============================================
// INTERFACES
// ============================================

export type ClienteGlobal = {
  id: number;
  name: string;
  age: number;
  phone: string;
  membership_type: "semana" | "mes" | "anualidad";
  membership_start: string; // ISO date
  membership_end: string; // ISO date
  is_activated: boolean;
  sucursal: {
    id: number;
    name: string;
  };
}

export interface PaginacionClientesGlobales {
  pagina: number;
  limite: number;
  totalPaginas: number;
  totalClientes: number;
}

export interface ResponseClientesGlobales {
  data: ClienteGlobal[];
  paginacion: PaginacionClientesGlobales;
}

// ============================================
// DATOS MOCK
// ============================================

const clientesGlobalesMock: ClienteGlobal[] = [
  // Sucursal Juarez
  {
    id: 51,
    name: "Angel Pineda Rodriguez",
    age: 26,
    phone: "4521097393",
    membership_type: "anualidad",
    membership_start: "2025-12-13T16:44:34.000Z",
    membership_end: "2026-12-13T16:44:34.000Z",
    is_activated: true,
    sucursal: { id: 1, name: "Sucursal Juarez" }
  },
  {
    id: 52,
    name: "María González López",
    age: 32,
    phone: "4521098765",
    membership_type: "mes",
    membership_start: "2026-01-15T10:00:00.000Z",
    membership_end: "2026-02-15T10:00:00.000Z",
    is_activated: true,
    sucursal: { id: 1, name: "Sucursal Juarez" }
  },
  {
    id: 53,
    name: "Carlos Ramírez Torres",
    age: 45,
    phone: "4521087654",
    membership_type: "semana",
    membership_start: "2026-01-10T08:30:00.000Z",
    membership_end: "2026-01-17T08:30:00.000Z", // Vencida
    is_activated: false,
    sucursal: { id: 1, name: "Sucursal Juarez" }
  },

  // Sucursal Centro
  {
    id: 21,
    name: "Andrea Lucía Herrera",
    age: 28,
    phone: "4431230021",
    membership_type: "semana",
    membership_start: "2026-02-18T00:00:00.000Z",
    membership_end: "2026-02-25T00:00:00.000Z",
    is_activated: true,
    sucursal: { id: 2, name: "Sucursal Centro" }
  },
  {
    id: 22,
    name: "Luis Alberto Sánchez",
    age: 35,
    phone: "4431230022",
    membership_type: "mes",
    membership_start: "2026-01-20T00:00:00.000Z",
    membership_end: "2026-02-20T00:00:00.000Z",
    is_activated: true,
    sucursal: { id: 2, name: "Sucursal Centro" }
  },
  {
    id: 23,
    name: "Patricia Vega Ruiz",
    age: 29,
    phone: "4431230023",
    membership_type: "anualidad",
    membership_start: "2025-06-10T00:00:00.000Z",
    membership_end: "2026-06-10T00:00:00.000Z",
    is_activated: true,
    sucursal: { id: 2, name: "Sucursal Centro" }
  },

  // Sucursal Casa del Niño
  {
    id: 18,
    name: "Andrés Felipe Moreno",
    age: 39,
    phone: "4431230018",
    membership_type: "semana",
    membership_start: "2026-02-08T00:00:00.000Z",
    membership_end: "2026-02-15T00:00:00.000Z",
    is_activated: true,
    sucursal: { id: 3, name: "Sucursal Casa del Niño" }
  },
  {
    id: 19,
    name: "Sofía Martínez Cruz",
    age: 24,
    phone: "4431230019",
    membership_type: "mes",
    membership_start: "2026-01-05T00:00:00.000Z",
    membership_end: "2026-02-05T00:00:00.000Z",
    is_activated: true,
    sucursal: { id: 3, name: "Sucursal Casa del Niño" }
  },
  {
    id: 20,
    name: "Roberto Díaz Flores",
    age: 41,
    phone: "4431230020",
    membership_type: "semana",
    membership_start: "2026-01-01T00:00:00.000Z",
    membership_end: "2026-01-08T00:00:00.000Z", // Vencida
    is_activated: false,
    sucursal: { id: 3, name: "Sucursal Casa del Niño" }
  },

  // Sucursal Norte
  {
    id: 30,
    name: "Gabriela Fernández Ríos",
    age: 27,
    phone: "4431230030",
    membership_type: "anualidad",
    membership_start: "2025-08-15T00:00:00.000Z",
    membership_end: "2026-08-15T00:00:00.000Z",
    is_activated: true,
    sucursal: { id: 4, name: "Sucursal Norte" }
  },
  {
    id: 31,
    name: "Diego Castillo Méndez",
    age: 33,
    phone: "4431230031",
    membership_type: "mes",
    membership_start: "2026-01-10T00:00:00.000Z",
    membership_end: "2026-02-10T00:00:00.000Z",
    is_activated: true,
    sucursal: { id: 4, name: "Sucursal Norte" }
  },
  {
    id: 32,
    name: "Laura Jiménez Ortiz",
    age: 30,
    phone: "4431230032",
    membership_type: "semana",
    membership_start: "2026-02-15T00:00:00.000Z",
    membership_end: "2026-02-22T00:00:00.000Z",
    is_activated: true,
    sucursal: { id: 4, name: "Sucursal Norte" }
  },

  // Sucursal Sur
  {
    id: 40,
    name: "Fernando Rojas Gómez",
    age: 38,
    phone: "4431230040",
    membership_type: "mes",
    membership_start: "2025-12-20T00:00:00.000Z",
    membership_end: "2026-01-20T00:00:00.000Z", // Vencida
    is_activated: false,
    sucursal: { id: 5, name: "Sucursal Sur" }
  },
  {
    id: 41,
    name: "Valeria Torres Navarro",
    age: 25,
    phone: "4431230041",
    membership_type: "semana",
    membership_start: "2026-02-10T00:00:00.000Z",
    membership_end: "2026-02-17T00:00:00.000Z",
    is_activated: true,
    sucursal: { id: 5, name: "Sucursal Sur" }
  },
  {
    id: 42,
    name: "Ricardo Medina Pérez",
    age: 42,
    phone: "4431230042",
    membership_type: "anualidad",
    membership_start: "2025-10-01T00:00:00.000Z",
    membership_end: "2026-10-01T00:00:00.000Z",
    is_activated: true,
    sucursal: { id: 5, name: "Sucursal Sur" }
  }
];

// ============================================
// FUNCIÓN PARA SIMULAR PAGINACIÓN
// ============================================

export const getClientesGlobalesPaginados = (
  pagina: number = 1,
  limite: number = 5
): ResponseClientesGlobales => {
  const inicio = (pagina - 1) * limite;
  const fin = inicio + limite;
  const clientesPaginados = clientesGlobalesMock.slice(inicio, fin);

  return {
    data: clientesPaginados,
    paginacion: {
      pagina,
      limite,
      totalPaginas: Math.ceil(clientesGlobalesMock.length / limite),
      totalClientes: clientesGlobalesMock.length
    }
  };
};