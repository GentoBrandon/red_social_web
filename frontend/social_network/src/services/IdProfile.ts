// src/services/profileService.ts
import axios from 'axios';
import { API_ROUTES } from '@/routes/apiRoutes';

// Define la interfaz de la respuesta de la API, si quieres más tipado
interface ProfileResponse {
  person: {
    id: number;
    first_name: string;
    last_name: string;
    birth_date: string;
    email: string;
  };
}

/**
 * Obtiene el ID del perfil del usuario actual desde el backend.
 * @returns El ID del perfil del usuario actual.
 * @throws Error si no se puede obtener el ID.
 */
export const fetchProfileId = async (): Promise<number> => {
  try {
    const response = await axios.get<ProfileResponse>(API_ROUTES.DASHBOARD, { withCredentials: true });
    const id = response.data.person.id;
    return id;
  } catch (error) {
    console.error("Error al obtener el ID del perfil:", error);
    throw error; // Lanza el error para que pueda ser manejado donde se llame
  }
};
