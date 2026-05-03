export interface AdminProfile {
  id: number;
  email: string;
  is_confirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Datos ficticios para desarrollo
export const adminProfileMockData: AdminProfile = {
  id: 1,
  email: "admin@globalgym.com",
  is_confirmed: true,
  createdAt: "2024-01-15T10:30:00.000Z",
  updatedAt: "2024-01-15T10:30:00.000Z"
};

// Función auxiliar para formatear fecha (opcional, la usarás en el componente)
export const formatearFecha = (fecha: string): string => {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};