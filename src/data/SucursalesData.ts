// 🏢 Interface para una Sucursal individual
export interface Sucursal {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  is_verified: boolean;
  is_activated: boolean;
  superAdminId: number;
  createdAt: string;
  updatedAt: string;
}

// 📊 Interface para la respuesta paginada del backend
export interface SucursalesResponse {
  data: Sucursal[];
  paginacion: {
    pagina: number;
    limite: number;
    totalPaginas: number;
    totalSucursales: number;
  };
}

// 📋 Datos ficticios de sucursales (solo para visualizar el diseño)
export const sucursalesMockData: SucursalesResponse = {
  data: [
    {
      id: 1,
      name: "Gym Centro",
      email: "gymcentro@gmail.com",
      address: "Av. Principal 123, Col. Centro",
      phone: "4431234567",
      is_verified: true,
      is_activated: true,
      superAdminId: 1,
      createdAt: "2024-01-15T10:30:00.000Z",
      updatedAt: "2024-01-15T10:30:00.000Z"
    },
    {
      id: 2,
      name: "Gym Norte",
      email: "gymnorte@gmail.com",
      address: "Av. Madero 456, Col. Norte",
      phone: "4431234568",
      is_verified: true,
      is_activated: true,
      superAdminId: 1,
      createdAt: "2024-01-20T14:20:00.000Z",
      updatedAt: "2024-01-20T14:20:00.000Z"
    },
    {
      id: 3,
      name: "Gym Sur",
      email: "gymsur@gmail.com",
      address: "Blvd. Sur 789, Col. Jardines",
      phone: "4431234569",
      is_verified: true,
      is_activated: false,
      superAdminId: 1,
      createdAt: "2024-02-01T09:15:00.000Z",
      updatedAt: "2024-02-01T09:15:00.000Z"
    },
    {
      id: 4,
      name: "Gym Plaza Victoria",
      email: "gymvictoria@gmail.com",
      address: "Plaza Victoria Local 12",
      phone: "4431234570",
      is_verified: false,
      is_activated: true,
      superAdminId: 1,
      createdAt: "2024-02-10T11:00:00.000Z",
      updatedAt: "2024-02-10T11:00:00.000Z"
    },
    {
      id: 5,
      name: "Gym Insurgentes",
      email: "gyminsurgentes@gmail.com",
      address: "Av. Insurgentes 321, Col. Roma",
      phone: "4431234571",
      is_verified: true,
      is_activated: true,
      superAdminId: 1,
      createdAt: "2024-02-15T16:45:00.000Z",
      updatedAt: "2024-02-15T16:45:00.000Z"
    },
    {
      id: 6,
      name: "Gym Polanco",
      email: "gympolanco@gmail.com",
      address: "Calle Polanco 654, Col. Polanco",
      phone: "4431234572",
      is_verified: true,
      is_activated: true,
      superAdminId: 1,
      createdAt: "2024-03-01T08:30:00.000Z",
      updatedAt: "2024-03-01T08:30:00.000Z"
    },
    {
      id: 7,
      name: "Gym Santa Fe",
      email: "gymsantafe@gmail.com",
      address: "Av. Santa Fe 987, Santa Fe",
      phone: "4431234573",
      is_verified: false,
      is_activated: false,
      superAdminId: 1,
      createdAt: "2024-03-05T10:00:00.000Z",
      updatedAt: "2024-03-05T10:00:00.000Z"
    },
    {
      id: 8,
      name: "Gym Satélite",
      email: "gymsatelite@gmail.com",
      address: "Circuito Satélite 147, Satélite",
      phone: "4431234574",
      is_verified: true,
      is_activated: true,
      superAdminId: 1,
      createdAt: "2024-03-10T13:20:00.000Z",
      updatedAt: "2024-03-10T13:20:00.000Z"
    },
    {
      id: 9,
      name: "Gym Condesa",
      email: "gymcondesa@gmail.com",
      address: "Calle Amsterdam 258, Condesa",
      phone: "4431234575",
      is_verified: true,
      is_activated: false,
      superAdminId: 1,
      createdAt: "2024-03-15T15:30:00.000Z",
      updatedAt: "2024-03-15T15:30:00.000Z"
    }
  ],
  paginacion: {
    pagina: 1,
    limite: 9,
    totalPaginas: 2,
    totalSucursales: 18
  }
};

// 🔧 Función helper para buscar una sucursal por ID
export const getSucursalById = (id: number): Sucursal | undefined => {
  return sucursalesMockData.data.find(s => s.id === id);
};