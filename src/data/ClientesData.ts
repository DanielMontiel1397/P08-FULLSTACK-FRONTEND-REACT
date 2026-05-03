// 👤 Interface para un Cliente individual
export type Cliente = {
  id: number;
  name: string;
  phone: string;
  age: number;
  membership_type: 'semana' | 'mes' | 'anualidad';
  membership_start: string;
  membership_end: string;
  is_activated: boolean;
  sucursalId: number;
  createdAt: string;
  updatedAt: string;
}

// 📋 Datos ficticios de clientes
export const clientesMockData: Cliente[] = [
  // Clientes de Gym Centro (sucursalId: 1)
  {
    id: 1,
    name: "Juan Pérez García",
    phone: "4431111111",
    age: 28,
    membership_type: "mes",
    membership_start: "2024-12-01T00:00:00.000Z",
    membership_end: "2025-01-01T00:00:00.000Z",
    is_activated: true,
    sucursalId: 1,
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: 2,
    name: "María López Hernández",
    phone: "4431111112",
    age: 32,
    membership_type: "anualidad",
    membership_start: "2024-06-15T00:00:00.000Z",
    membership_end: "2025-06-15T00:00:00.000Z",
    is_activated: true,
    sucursalId: 1,
    createdAt: "2024-06-15T14:30:00.000Z",
    updatedAt: "2024-06-15T14:30:00.000Z"
  },
  {
    id: 3,
    name: "Carlos Ramírez Soto",
    phone: "4431111113",
    age: 25,
    membership_type: "semana",
    membership_start: "2025-01-13T00:00:00.000Z",
    membership_end: "2025-01-20T00:00:00.000Z",
    is_activated: true,
    sucursalId: 1,
    createdAt: "2025-01-13T09:00:00.000Z",
    updatedAt: "2025-01-13T09:00:00.000Z"
  },
  {
    id: 4,
    name: "Ana Martínez Cruz",
    phone: "4431111114",
    age: 29,
    membership_type: "mes",
    membership_start: "2024-11-20T00:00:00.000Z",
    membership_end: "2024-12-20T00:00:00.000Z",
    is_activated: false,
    sucursalId: 1,
    createdAt: "2024-11-20T11:15:00.000Z",
    updatedAt: "2024-11-20T11:15:00.000Z"
  },
  {
    id: 5,
    name: "Luis Fernández Díaz",
    phone: "4431111115",
    age: 35,
    membership_type: "mes",
    membership_start: "2025-01-05T00:00:00.000Z",
    membership_end: "2025-02-05T00:00:00.000Z",
    is_activated: true,
    sucursalId: 1,
    createdAt: "2025-01-05T16:45:00.000Z",
    updatedAt: "2025-01-05T16:45:00.000Z"
  },
  {
    id: 6,
    name: "Patricia Gómez Ruiz",
    phone: "4431111116",
    age: 27,
    membership_type: "anualidad",
    membership_start: "2024-08-10T00:00:00.000Z",
    membership_end: "2025-08-10T00:00:00.000Z",
    is_activated: true,
    sucursalId: 1,
    createdAt: "2024-08-10T13:20:00.000Z",
    updatedAt: "2024-08-10T13:20:00.000Z"
  },
  {
    id: 7,
    name: "Roberto Sánchez Morales",
    phone: "4431111117",
    age: 41,
    membership_type: "mes",
    membership_start: "2024-10-15T00:00:00.000Z",
    membership_end: "2024-11-15T00:00:00.000Z",
    is_activated: false,
    sucursalId: 1,
    createdAt: "2024-10-15T08:30:00.000Z",
    updatedAt: "2024-10-15T08:30:00.000Z"
  },

  // Clientes de Gym Norte (sucursalId: 2)
  {
    id: 8,
    name: "Laura Jiménez Torres",
    phone: "4432222221",
    age: 24,
    membership_type: "semana",
    membership_start: "2025-01-14T00:00:00.000Z",
    membership_end: "2025-01-21T00:00:00.000Z",
    is_activated: true,
    sucursalId: 2,
    createdAt: "2025-01-14T10:00:00.000Z",
    updatedAt: "2025-01-14T10:00:00.000Z"
  },
  {
    id: 9,
    name: "Miguel Ángel Vargas",
    phone: "4432222222",
    age: 30,
    membership_type: "mes",
    membership_start: "2025-01-01T00:00:00.000Z",
    membership_end: "2025-02-01T00:00:00.000Z",
    is_activated: true,
    sucursalId: 2,
    createdAt: "2025-01-01T12:00:00.000Z",
    updatedAt: "2025-01-01T12:00:00.000Z"
  },
  {
    id: 10,
    name: "Sofia Mendoza Reyes",
    phone: "4432222223",
    age: 26,
    membership_type: "anualidad",
    membership_start: "2024-05-20T00:00:00.000Z",
    membership_end: "2025-05-20T00:00:00.000Z",
    is_activated: true,
    sucursalId: 2,
    createdAt: "2024-05-20T15:30:00.000Z",
    updatedAt: "2024-05-20T15:30:00.000Z"
  },
  {
    id: 11,
    name: "Diego Castro Vega",
    phone: "4432222224",
    age: 33,
    membership_type: "mes",
    membership_start: "2024-12-10T00:00:00.000Z",
    membership_end: "2025-01-10T00:00:00.000Z",
    is_activated: true,
    sucursalId: 2,
    createdAt: "2024-12-10T09:45:00.000Z",
    updatedAt: "2024-12-10T09:45:00.000Z"
  },
  {
    id: 12,
    name: "Gabriela Ortiz Luna",
    phone: "4432222225",
    age: 29,
    membership_type: "semana",
    membership_start: "2024-11-05T00:00:00.000Z",
    membership_end: "2024-11-12T00:00:00.000Z",
    is_activated: false,
    sucursalId: 2,
    createdAt: "2024-11-05T11:00:00.000Z",
    updatedAt: "2024-11-05T11:00:00.000Z"
  },
  {
    id: 13,
    name: "Fernando Rojas Silva",
    phone: "4432222226",
    age: 38,
    membership_type: "anualidad",
    membership_start: "2024-09-01T00:00:00.000Z",
    membership_end: "2025-09-01T00:00:00.000Z",
    is_activated: true,
    sucursalId: 2,
    createdAt: "2024-09-01T14:20:00.000Z",
    updatedAt: "2024-09-01T14:20:00.000Z"
  },

  // Clientes de Gym Sur (sucursalId: 3)
  {
    id: 14,
    name: "Valentina Herrera Ramos",
    phone: "4433333331",
    age: 22,
    membership_type: "mes",
    membership_start: "2025-01-08T00:00:00.000Z",
    membership_end: "2025-02-08T00:00:00.000Z",
    is_activated: true,
    sucursalId: 3,
    createdAt: "2025-01-08T10:30:00.000Z",
    updatedAt: "2025-01-08T10:30:00.000Z"
  },
  {
    id: 15,
    name: "Andrés Molina Cortés",
    phone: "4433333332",
    age: 27,
    membership_type: "semana",
    membership_start: "2025-01-15T00:00:00.000Z",
    membership_end: "2025-01-22T00:00:00.000Z",
    is_activated: true,
    sucursalId: 3,
    createdAt: "2025-01-15T08:00:00.000Z",
    updatedAt: "2025-01-15T08:00:00.000Z"
  },
  {
    id: 16,
    name: "Camila Delgado Paredes",
    phone: "4433333333",
    age: 31,
    membership_type: "anualidad",
    membership_start: "2024-07-12T00:00:00.000Z",
    membership_end: "2025-07-12T00:00:00.000Z",
    is_activated: true,
    sucursalId: 3,
    createdAt: "2024-07-12T13:45:00.000Z",
    updatedAt: "2024-07-12T13:45:00.000Z"
  },
  {
    id: 17,
    name: "Ricardo Navarro Fuentes",
    phone: "4433333334",
    age: 36,
    membership_type: "mes",
    membership_start: "2024-09-20T00:00:00.000Z",
    membership_end: "2024-10-20T00:00:00.000Z",
    is_activated: false,
    sucursalId: 3,
    createdAt: "2024-09-20T16:00:00.000Z",
    updatedAt: "2024-09-20T16:00:00.000Z"
  },
  {
    id: 18,
    name: "Isabella Campos Aguirre",
    phone: "4433333335",
    age: 25,
    membership_type: "mes",
    membership_start: "2025-01-12T00:00:00.000Z",
    membership_end: "2025-02-12T00:00:00.000Z",
    is_activated: true,
    sucursalId: 3,
    createdAt: "2025-01-12T11:30:00.000Z",
    updatedAt: "2025-01-12T11:30:00.000Z"
  }
];

// 🔧 Función helper para obtener clientes de una sucursal específica
export const getClientesBySucursalId = (sucursalId: number): Cliente[] => {
  return clientesMockData.filter(cliente => cliente.sucursalId === sucursalId);
};

// 🔧 Función helper para obtener estadísticas de clientes de una sucursal
export const getClientesStatsBySucursalId = (sucursalId: number) => {
  const clientes = getClientesBySucursalId(sucursalId);
  const activos = clientes.filter(c => c.is_activated);
  const inactivos = clientes.filter(c => !c.is_activated);

  return {
    total: clientes.length,
    activos: activos.length,
    inactivos: inactivos.length
  };
};